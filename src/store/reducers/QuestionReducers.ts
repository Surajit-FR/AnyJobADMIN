import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../../types/common";

const initialState: DataState = {
    questionData: [],
    singleQuestionData: {},
    error: null,
    type: ''
};

const QuestionSlice = createSlice({
    name: "questionSlice",
    initialState,
    reducers: {
        // Add question
        addQuestionRequest: (state, { payload, type }) => {
            state.type = type;
        },
        addQuestionSuccess: (state, { payload, type }) => {
            state.type = type;
        },
        addQuestionFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },

        // Get all question
        getAllQuestionRequest: (state, { payload, type }) => {
            state.type = type;
        },
        getAllQuestionSuccess: (state, { payload, type }) => {
            state.type = type;
            state.questionData = payload?.data;
        },
        getAllQuestionFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },

        // Get question
        getQuestionRequest: (state, { payload, type }) => {
            state.type = type;
        },
        getQuestionSuccess: (state, { payload, type }) => {
            state.type = type;
            state.singleQuestionData = payload?.data;
        },
        getQuestionFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },

        // Update question
        updateQuestionRequest: (state, { payload, type }) => {
            state.type = type;
        },
        updateQuestionSuccess: (state, { payload, type }) => {
            state.type = type;
        },
        updateQuestionFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },

        // Delete question
        deleteQuestionRequest: (state, { payload, type }) => {
            state.type = type;
        },
        deleteQuestionSuccess: (state, { payload, type }) => {
            state.type = type;
        },
        deleteQuestionFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },
    }
});

export const {
    addQuestionRequest,
    addQuestionSuccess,
    addQuestionFailure,

    getAllQuestionRequest,
    getAllQuestionSuccess,
    getAllQuestionFailure,

    getQuestionRequest,
    getQuestionSuccess,
    getQuestionFailure,

    updateQuestionRequest,
    updateQuestionSuccess,
    updateQuestionFailure,

    deleteQuestionRequest,
    deleteQuestionSuccess,
    deleteQuestionFailure,
} = QuestionSlice.actions;

export default QuestionSlice.reducer;