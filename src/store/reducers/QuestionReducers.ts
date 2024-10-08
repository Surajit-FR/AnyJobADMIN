import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../../types/common";

const initialState: DataState = {
    questionData: [],
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
    }
});

export const {
    getAllQuestionRequest,
    getAllQuestionSuccess,
    getAllQuestionFailure,
} = QuestionSlice.actions;

export default QuestionSlice.reducer;