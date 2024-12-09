import axios from "axios";
import { REACT_APP_BASE_URL } from "../../config/app.config";
import { TLoginCredentials } from "../../../types/authTypes";
import { TCategoryPayload } from "../../../types/categoryTypes";
import { setupInterceptors } from "./interceptor";
import { TQuestionPayload } from "../../../types/questionTypes";
import { TShiftPayload } from "../../../types/shiftTypes";
import { AddAdminUserFormData } from "../../components/core/AddAdminUser";

// Create axios instance
export const API = axios.create({ baseURL: REACT_APP_BASE_URL, withCredentials: true });

// Set up interceptors
setupInterceptors();

// Login
export const LOGIN = (data: TLoginCredentials) => API.post("/auth/signin", data);
// Logout
export const LOGOUT = () => API.post("/auth/logout");
// Add admin user
export const ADDADMINUSER = (data: AddAdminUserFormData) => API.post("/auth/add-admin-user", data);
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
// Get All questions
export const ADDQUESTIONS = (data: any) => API.post("/question", data);
// Get All questions
export const GETALLQUESTIONS = (params: { categoryId?: string }) => {
    const queryString = new URLSearchParams();
    // Add categoryId only if it exists
    if (params.categoryId) {
        queryString.append('categoryId', params.categoryId);
    }
    return API.get(`/question?${queryString.toString()}`);
};
// Get question
export const GETQUESTION = (categoryId: string, questionId: string) => API.get(`/question/q/${categoryId}/${questionId}`);
// Update question
export const UPDATEQUESTION = (data: TQuestionPayload, categoryId: string, questionId: string) => API.patch(`/question/q/${categoryId}/${questionId}`, data);
// Delete question
export const DELETEQUESTION = (questionId: string) => API.delete(`/question/q/${questionId}`);
// Add shift
export const ADDSHIFT = (data: TShiftPayload) => API.post("/shift", data);
// Get all shifts
export const GETALLSHIFTS = () => API.get("/shift");
// Get shift
export const GETSHIFT = (shiftId: string) => API.get(`/shift/${shiftId}`);
// Update shift
export const UPDATESHIFT = (shiftId: string, data: TShiftPayload) => API.patch(`/shift/${shiftId}`, data);
// Delete shift
export const DELETESHIFT = (shiftId: string) => API.delete(`/shift/${shiftId}`);
// Get user details
export const USERDETAILS = (userId: string) => API.get(`/user/u/${userId}`);
// Verify service provider
export const VERIFYSERVICEPROVEIDER = (userId: string, isVerified: boolean) => API.patch(`/user/verify/${userId}`, { isVerified });
// Fetch service req details
export const FETCHSERVICEREQDETAILS = (serviceId: string) => API.get(`/service/c/${serviceId}`);