import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../../types/common";

const initialState: DataState = {
    subCategoryData: [],
    singleSubCategoryData: {},
    error: null,
    type: ''
};

const SubCategorySlice = createSlice({
    name: "subCategorySlice",
    initialState,
    reducers: {
        // Add sub category
        addSubCategoryRequest: (state, { payload, type }) => {
            state.type = type;
        },
        addSubCategorySuccess: (state, { payload, type }) => {
            state.type = type;
        },
        addSubCategoryFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },

        // Get all sub category
        getAllSubCategoryRequest: (state, { payload, type }) => {
            state.type = type;
        },
        getAllSubCategorySuccess: (state, { payload, type }) => {
            state.type = type;
            state.subCategoryData = payload?.data;
        },
        getAllSubCategoryFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },

        // Get sub category
        getSubCategoryRequest: (state, { payload, type }) => {
            state.type = type;
        },
        getSubCategorySuccess: (state, { payload, type }) => {
            state.type = type;
            state.singleSubCategoryData = payload?.data;
        },
        getSubCategoryFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },

        // Update sub category
        updateSubCategoryRequest: (state, { payload, type }) => {
            state.type = type;
        },
        updateSubCategorySuccess: (state, { payload, type }) => {
            state.type = type;
        },
        updateSubCategoryFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },

        // Delete sub category
        deleteSubCategoryRequest: (state, { payload, type }) => {
            state.type = type;
        },
        deleteSubCategorySuccess: (state, { payload, type }) => {
            state.type = type;
        },
        deleteSubCategoryFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },
    }
});

export const {
    addSubCategoryRequest,
    addSubCategorySuccess,
    addSubCategoryFailure,

    getSubCategoryRequest,
    getSubCategorySuccess,
    getSubCategoryFailure,

    getAllSubCategoryRequest,
    getAllSubCategorySuccess,
    getAllSubCategoryFailure,

    updateSubCategoryRequest,
    updateSubCategorySuccess,
    updateSubCategoryFailure,

    deleteSubCategoryRequest,
    deleteSubCategorySuccess,
    deleteSubCategoryFailure,
} = SubCategorySlice.actions;

export default SubCategorySlice.reducer;