import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../../types/common";

const initialState: DataState = {
    questionData: [],
    singleQuestionData: [],
    error: null,
    type: ''
};

const QuestionSlice = createSlice({
    name: "questionSlice",
    initialState,
    reducers: {
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
    }
});

export const {
    getAllQuestionRequest,
    getAllQuestionSuccess,
    getAllQuestionFailure,

    getQuestionRequest,
    getQuestionSuccess,
    getQuestionFailure,

    updateQuestionRequest,
    updateQuestionSuccess,
    updateQuestionFailure,
} = QuestionSlice.actions;

export default QuestionSlice.reducer;