import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator } from "../../../types/common";
import { TQuestion, TQuestionAPIResponse } from "../../../types/questionTypes";
import {
    GETALLQUESTIONS,
    GETQUESTION
} from "../api/Api";
import {
    getAllQuestionFailure,
    getAllQuestionSuccess,
    getQuestionFailure,
    getQuestionSuccess
} from "../reducers/QuestionReducers";


// getAllQuestionSaga generator function
export function* getAllQuestionSaga({ payload, type }: { payload: { subCategoryId: string, categoryId?: string }, type: string }): SagaGenerator<{ data: ApiResponse<TQuestionAPIResponse> }> {
    try {
        // Call the API with subCategoryId and categoryId
        const resp = yield call(GETALLQUESTIONS, payload.subCategoryId, { categoryId: payload.categoryId });
        const result: ApiResponse<TQuestionAPIResponse> = resp?.data;
        if (result?.success) {
            yield put(getAllQuestionSuccess(result));
        }
    } catch (error: any) {
        yield put(getAllQuestionFailure(error?.response?.data?.message));
    }
};

// getQuestionSaga generator function
export function* getQuestionSaga({ payload, type }: { payload: { subCategoryId: string, questionId: string }, type: string }): SagaGenerator<{ data: ApiResponse<TQuestion> }> {
    try {
        // Call the API with subCategoryId and categoryId
        const resp = yield call(GETQUESTION, payload.subCategoryId, payload.questionId);
        const result: ApiResponse<TQuestion> = resp?.data;
        if (result?.success) {
            yield put(getQuestionSuccess(result));
        }
    } catch (error: any) {
        yield put(getQuestionFailure(error?.response?.data?.message));
    }
};


// Watcher generator function
export default function* watchQuestion() {
    yield takeLatest('questionSlice/getAllQuestionRequest', getAllQuestionSaga);
    yield takeLatest('questionSlice/getQuestionRequest', getQuestionSaga);
};