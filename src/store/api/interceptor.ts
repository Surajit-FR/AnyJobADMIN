import { API } from "./Api";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Function to notify all subscribers with the new token
const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};

// Function to add a request to the queue of subscribers awaiting a token refresh
const addRefreshSubscriber = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
};

// Attach request and response interceptors to the Axios instance
export const setupInterceptors = () => {
    API.interceptors.request.use(
        (config) => {
            // Check if cookies have been cleared; if so, get tokens from localStorage
            const accessToken = document.cookie.includes("accessToken")
                ? undefined
                : localStorage.getItem("accessToken");

            // Set Authorization header if accessToken is available from cookies or localStorage
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    API.interceptors.response.use(
        (response) => response, // Return the response directly if no error
        async (error) => {
            const { config, response } = error;
            const originalRequest = config;

            // Check if error is 401 due to an expired token and retry flag is not set
            if (response?.status === 401 && !originalRequest._retry) {
                const errorMessage = response.data?.message || '';

                if (errorMessage === "jwt expired" || errorMessage === "Unauthorized request") {
                    // Token has expired, we need to refresh
                    if (isRefreshing) {
                        // Queue the request if token is already being refreshed
                        return new Promise((resolve, reject) => {
                            addRefreshSubscriber((token: string) => {
                                originalRequest.headers.Authorization = `Bearer ${token}`;
                                resolve(API(originalRequest));
                            });
                        });
                    }

                    // Set retry flag to avoid looping
                    originalRequest._retry = true;
                    isRefreshing = true;

                    try {
                        // Check for refresh token in cookies or localStorage as a fallback
                        const refreshToken = document.cookie.includes("refreshToken")
                            ? undefined
                            : localStorage.getItem("refreshToken");

                        if (!refreshToken) {
                            throw new Error("No refresh token available");
                        }

                        // Call the refresh token API
                        const refreshResponse = await API.post("/auth/refresh-token", { refreshToken });
                        const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data.data;

                        if (accessToken) {
                            // Store new tokens in localStorage if needed
                            localStorage.setItem("accessToken", accessToken);
                            if (newRefreshToken) {
                                localStorage.setItem("refreshToken", newRefreshToken);
                            }

                            // Notify all queued requests with the new token
                            onRefreshed(accessToken);
                            isRefreshing = false;

                            // Retry original request with the new token
                            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                            return API(originalRequest);
                        }
                    } catch (err: any) {
                        isRefreshing = false;

                        // If the refresh token has expired or is invalid
                        if (err.response?.data?.message === "Refresh token is expired or used") {
                            localStorage.removeItem("accessToken");
                            localStorage.removeItem("refreshToken");
                        }

                        return Promise.reject(err);
                    }
                }
            }
            // Reject the error if it's not a token expiration issue
            return Promise.reject(error);
        }
    );
};