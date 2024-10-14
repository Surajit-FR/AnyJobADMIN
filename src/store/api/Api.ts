import axios from "axios";
import { REACT_APP_BASE_URL } from "../../config/app.config";
import { TLoginCredentials } from "../../../types/authTypes";
import { TCategoryPayload } from "../../../types/categoryTypes";
import { GetAllSubcategoryParams, TSubCategoryPayload } from "../../../types/subCategoryTypes";
import { setupInterceptors } from "./interceptor";
import { TQuestionPayload } from "../../../types/questionTypes";

// Create axios instance
export const API = axios.create({ baseURL: REACT_APP_BASE_URL, withCredentials: true });

// Set up interceptors
setupInterceptors();

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
// Add Sub Category
export const ADDSUBCATEGORY = (data: TSubCategoryPayload) => API.post("/subcategory", data);
// Get All Sub Category
export const GETALLSUBCATEGORY = (params: GetAllSubcategoryParams) => {
    const queryString = new URLSearchParams(params).toString();
    return API.get(`/subcategory?${queryString}`)
};
// Get Sub Category
export const GETSUBCATEGORY = (SubCategoryId: string | undefined) => API.get(`/subcategory/c/${SubCategoryId}`);
// Update Sub Category
export const UPDATESUBCATEGORY = (data: TSubCategoryPayload, SubCategoryId: string | undefined) => API.patch(`/subcategory/c/${SubCategoryId}`, data);
// Delete Sub Category
export const DELETESUBCATEGORY = (SubCategoryId: string | undefined) => API.delete(`/subcategory/c/${SubCategoryId}`);
// Get All questions
export const GETALLQUESTIONS = (subCategoryId: string, params: GetAllSubcategoryParams) => {
    const queryString = new URLSearchParams();

    // Add categoryId only if it exists
    if (params.categoryId) {
        queryString.append('categoryId', params.categoryId);
    }
    return API.get(`/question/${subCategoryId}?${queryString.toString()}`);
};
// Get question
export const GETQUESTION = (subCategoryId: string, questionId: string) => API.get(`/question/${subCategoryId}/${questionId}`);
// Update question
export const UPDATEQUESTION = (data: TQuestionPayload, subCategoryId: string, questionId: string) => API.patch(`/question/${subCategoryId}/${questionId}`, data);