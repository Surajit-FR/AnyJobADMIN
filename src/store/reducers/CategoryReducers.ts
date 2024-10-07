import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../../types/common";

const initialState: DataState = {
    categoryData: [],
    singleCategoryData: {},
    error: null,
    type: ''
};

const CategorySlice = createSlice({
    name: "categorySlice",
    initialState,
    reducers: {
        // Add category
        addCategoryRequest: (state, { payload, type }) => {
            state.type = type;
        },
        addCategorySuccess: (state, { payload, type }) => {
            state.type = type;
        },
        addCategoryFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },

        // Get all category
        getAllCategoryRequest: (state, { payload, type }) => {
            state.type = type;
        },
        getAllCategorySuccess: (state, { payload, type }) => {
            state.type = type;
            state.categoryData = payload?.data;
        },
        getAllCategoryFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },

        // Get category
        getCategoryRequest: (state, { payload, type }) => {
            state.type = type;
        },
        getCategorySuccess: (state, { payload, type }) => {
            state.type = type;
            state.singleCategoryData = payload?.data;
        },
        getCategoryFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },

        // Update category
        updateCategoryRequest: (state, { payload, type }) => {
            state.type = type;
        },
        updateCategorySuccess: (state, { payload, type }) => {
            state.type = type;
        },
        updateCategoryFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },

        // Delete category
        deleteCategoryRequest: (state, { payload, type }) => {
            state.type = type;
        },
        deleteCategorySuccess: (state, { payload, type }) => {
            state.type = type;
        },
        deleteCategoryFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },
    }
});

export const {
    addCategoryRequest,
    addCategorySuccess,
    addCategoryFailure,

    getCategoryRequest,
    getCategorySuccess,
    getCategoryFailure,

    getAllCategoryRequest,
    getAllCategorySuccess,
    getAllCategoryFailure,

    updateCategoryRequest,
    updateCategorySuccess,
    updateCategoryFailure,

    deleteCategoryRequest,
    deleteCategorySuccess,
    deleteCategoryFailure,
} = CategorySlice.actions;

export default CategorySlice.reducer;