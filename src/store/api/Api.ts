import axios from "axios";
import { REACT_APP_BASE_URL } from "../../config/app.config";
import { TLoginCredentials } from "../../../types/authTypes";
import { TCategoryPayload } from "../../../types/categoryTypes";

// Create axios instance
export const API = axios.create({ baseURL: REACT_APP_BASE_URL, withCredentials: true });

// Flag to control token refresh attempts
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Function to handle the refresh queue
const onRrefreshed = (token: string) => {
    refreshSubscribers.map((callback) => callback(token));
    refreshSubscribers = [];
};

// Function to add subscriber to the refresh queue
const addRefreshSubscriber = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
};

// Request Interceptor
API.interceptors.request.use(
    (config) => {
        // If using cookies, you don't need to manually add tokens to headers
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config, response } = error;
        const originalRequest = config;

        // Check if the error is due to an expired token
        if (response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Push the failed request to the subscribers' queue and return a promise
                return new Promise((resolve, reject) => {
                    addRefreshSubscriber((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(API(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Call the refresh token API
                const refreshResponse = await API.post("/auth/refresh-token"); // No need to send token explicitly as it's in cookies
                const { accessToken } = refreshResponse.data.data;

                if (accessToken) {
                    onRrefreshed(accessToken);
                }

                isRefreshing = false;

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return API(originalRequest);
            } catch (err: any) {
                isRefreshing = false;
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

// Login
export const LOGIN = (data: TLoginCredentials) => API.post("/auth/signin", data);
// Logout
export const LOGOUT = () => API.post("/auth/logout");

// Add Category
export const ADDCATEGORY = (data: TCategoryPayload) => API.post("/category", data);
// Get All Category
export const GETALLCATEGORY = () => API.get("/category");
// Delete Category
export const DELETECATEGORY = (categoryId: string | undefined) => API.delete(`/category/c/${categoryId}`);
// Get Category
export const GETCATEGORY = (categoryId: string | undefined) => API.get(`/category/c/${categoryId}`);
// Update Category
export const UPDATECATEGORY = (data: TCategoryPayload, categoryId: string | undefined) => API.put(`/category/c/${categoryId}`, data);

// // Update cover image
// export const UPDATECOVERIMAGE = (data: { coverImage: string }) => API.patch("/user/update-cover-image", data);
// // Channel stats
// export const CHANNELSTATS = () => API.get("/dashboard/stats");
// // Watch history
// export const WATCHHISTORY = () => API.get("/user/watch-history");
// // Add video
// export const ADDVIDEO = (data: TUploadVideo) => API.post("/videos", data);
// // All videos
// export const ALLVIDEOS = (params: GetAllVideosParams) => {
//     const queryString = new URLSearchParams(params as any).toString();
//     return API.get(`/videos?${queryString}`);
// };
// // Get a video
// export const GETAVIDEO = (video_id: string | undefined) => API.get(`/videos/${video_id}`);
// // Add video
// export const UPDATEVIDEO = (data: TUploadVideo, video_id: string | undefined) => API.patch(`/videos/${video_id}`, data);
// // Delete video
// export const DELETEVIDEO = (video_id: string | undefined) => API.delete(`/videos/${video_id}`);
// // Toggle video status
// export const TOGGLEVIDEOSTATUS = (video_id: string | undefined) => API.patch(`/videos/toggle/publish/${video_id}`);
// // Add comment
// export const ADDVIDEOCOMMENT = (video_id: string | undefined, content: string) => API.post(`/comments/${video_id}`, { content });
// // Get video comments
// export const GETVIDEOCOMMENTS = (video_id: string | undefined) => API.get(`/comments/${video_id}`);
// // Edit video comments
// export const EDITVIDEOCOMMENTS = (commentId: string | undefined, content: string) => API.patch(`/comments/c/${commentId}`, { content });
// // Delete video comments
// export const DELETEVIDEOCOMMENTS = (commentId: string | undefined) => API.delete(`/comments/c/${commentId}`);
// // Like video
// export const LIKEVIDEO = (video_id: string | undefined) => API.post(`/likes/toggle/v/${video_id}`);
// // Video likes
// export const GETVIDEOLIKES = (video_id: string | undefined) => API.get(`/likes/v/${video_id}`);