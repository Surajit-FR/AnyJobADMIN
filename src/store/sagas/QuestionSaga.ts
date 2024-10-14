import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator } from "../../../types/common";
import { TQuestion, TQuestionAPIResponse, TQuestionPayload } from "../../../types/questionTypes";
import {
    GETALLQUESTIONS,
    GETQUESTION,
    UPDATEQUESTION
} from "../api/Api";
import {
    getAllQuestionFailure,
    getAllQuestionRequest,
    getAllQuestionSuccess,
    getQuestionFailure,
    getQuestionSuccess,
    updateQuestionFailure,
    updateQuestionSuccess
} from "../reducers/QuestionReducers";
import { showToast } from "../../utils/Toast";


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

// updateQuestionSaga generator function
export function* updateQuestionSaga({ payload, type }: { payload: { data: TQuestionPayload, categoryId: string, subCategoryId: string, questionId: string }, type: string }): SagaGenerator<{ data: ApiResponse<TQuestion> }> {
    try {
        const resp = yield call(UPDATEQUESTION, payload.data, payload.subCategoryId, payload.questionId);
        const result: ApiResponse<TQuestion> = resp?.data;
        if (result?.success) {
            yield put(updateQuestionSuccess(result));
            showToast({ message: result?.message || 'Question updated successfully.', type: 'success', durationTime: 3500, position: "top-center" });
            yield put(getAllQuestionRequest({
                subCategoryId: payload?.subCategoryId,
                categoryId: payload?.categoryId || undefined,
            }));
        }
    } catch (error: any) {
        showToast({ message: error?.response?.data?.message, type: 'error', durationTime: 3500, position: "top-center" });
        yield put(updateQuestionFailure(error?.response?.data?.message));
    }
};


// Watcher generator function
export default function* watchQuestion() {
    yield takeLatest('questionSlice/getAllQuestionRequest', getAllQuestionSaga);
    yield takeLatest('questionSlice/getQuestionRequest', getQuestionSaga);
    yield takeLatest('questionSlice/updateQuestionRequest', updateQuestionSaga);
};