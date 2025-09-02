import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator } from "../../../types/common";
import { QuestionRespone, TDeriveQuestionPayload, TQuestion, TQuestionAPIResponse, TQuestionPayload } from "../../../types/questionTypes";
import {
    ADDQUESTIONS,
    DELETEDERIVEDQUESTION,
    DELETEQUESTION,
    GETALLQUESTIONS,
    GETQUESTION,
    UPDATEQUESTION
} from "../api/Api";
import {
    addQuestionFailure,
    addQuestionSuccess,
    deleteDerivedQuestionFailure,
    deleteDerivedQuestionSuccess,
    deleteQuestionFailure,
    deleteQuestionSuccess,
    getAllQuestionFailure,
    getAllQuestionRequest,
    getAllQuestionSuccess,
    getQuestionFailure,
    getQuestionRequest,
    getQuestionSuccess,
    updateQuestionFailure,
    updateQuestionSuccess
} from "../reducers/QuestionReducers";
import { showToast } from "../../utils/Toast";

// addQuestionSaga generator function
export function* addQuestionSaga({ payload, type }: { payload: { data: TQuestionPayload, reset: () => void }, type: string }): SagaGenerator<{ data: ApiResponse<TQuestion> }> {
    try {
        const resp = yield call(ADDQUESTIONS, payload.data);
        const result: ApiResponse<TQuestion> = resp?.data;
        if (result?.success) {
            yield put(addQuestionSuccess(result));
            payload?.reset();
            showToast({ message: result?.message || 'Question added successfully.', type: 'success', durationTime: 3500, position: "top-center" });
        }
    } catch (error: any) {
        showToast({ message: error?.response?.data?.message, type: 'error', durationTime: 3500, position: "top-center" });
        yield put(addQuestionFailure(error?.response?.data?.message));
    }
};

// getAllQuestionSaga generator function
export function* getAllQuestionSaga({ payload, type }: { payload: { categoryId?: string }, type: string }): SagaGenerator<{ data: ApiResponse<TQuestionAPIResponse> }> {
    try {
        // Call the API with subCategoryId and categoryId
        const resp = yield call(GETALLQUESTIONS, { categoryId: payload.categoryId });
        const result: ApiResponse<TQuestionAPIResponse> = resp?.data;
        if (result?.success) {
            yield put(getAllQuestionSuccess(result));
        }
    } catch (error: any) {
        yield put(getAllQuestionFailure(error?.response?.data?.message));
    }
};

// getQuestionSaga generator function
export function* getQuestionSaga({ payload, type }: { payload: { categoryId: string, questionId: string }, type: string }): SagaGenerator<{ data: ApiResponse<{ data: QuestionRespone }> }> {
    try {
        const resp = yield call(GETQUESTION, payload.categoryId, payload.questionId);

        const result: ApiResponse<{ data: QuestionRespone }> = resp?.data;
        console.log({result});
        
        if (result?.success) {
            yield put(getQuestionSuccess(result));
        }
    } catch (error: any) {
        yield put(getQuestionFailure(error?.response?.data?.message));
    }
};

// updateQuestionSaga generator function
export function* updateQuestionSaga({ payload, type }: { payload: { data: TQuestionPayload, categoryId: string, questionId: string }, type: string }): SagaGenerator<{ data: ApiResponse<TQuestion> }> {
    try {
        const resp = yield call(UPDATEQUESTION, payload.data, payload?.categoryId, payload?.questionId);
        const result: ApiResponse<TQuestion> = resp?.data;
        if (result?.success) {
            yield put(updateQuestionSuccess(result));
            showToast({ message: result?.message || 'Question updated successfully.', type: 'success', durationTime: 3500, position: "top-center" });
            yield put(getAllQuestionRequest({
                categoryId: payload?.data?.categoryId || undefined,
            }));
            yield put(getQuestionRequest({categoryId: payload?.categoryId || undefined, questionId: payload?.questionId}))
        }
    } catch (error: any) {
        showToast({ message: error?.response?.data?.message, type: 'error', durationTime: 3500, position: "top-center" });
        yield put(updateQuestionFailure(error?.response?.data?.message));
    }
};

// deleteQuestionSaga generator function
export function* deleteQuestionSaga({ payload, type }: { payload: { data: TQuestionPayload, questionId: string }, type: string }): SagaGenerator<{ data: ApiResponse<null> }> {
    try {
        const resp = yield call(DELETEQUESTION, payload?.questionId);
        const result: ApiResponse<null> = resp?.data;
        if (result?.success) {
            yield put(deleteQuestionSuccess(result));
            showToast({ message: result?.message || 'Question deleted successfully.', type: 'success', durationTime: 3500, position: "top-center" });
            yield put(getAllQuestionRequest({
                categoryId: payload?.data?.categoryId || undefined,
            }));
        }
    } catch (error: any) {
        showToast({ message: error?.response?.data?.message, type: 'error', durationTime: 3500, position: "top-center" });
        yield put(deleteQuestionFailure(error?.response?.data?.message));
    }
};
export function* deleteDerivedQuestionSaga({ payload, type }: { payload: { data: TDeriveQuestionPayload, categoryId: string }, type: string }): SagaGenerator<{ data: ApiResponse<null> }> {
    try {
        const resp = yield call(DELETEDERIVEDQUESTION, payload?.data);
        const result: ApiResponse<null> = resp?.data;
        if (result?.success) {
            yield put(deleteDerivedQuestionSuccess(result));
            showToast({ message: result?.message || 'Question deleted successfully.', type: 'success', durationTime: 3500, position: "top-center" });
            yield put(getQuestionRequest({
                categoryId: payload?.categoryId || undefined,
                questionId: payload?.data?.questionId
            }));
        }
    } catch (error: any) {
        showToast({ message: error?.response?.data?.message, type: 'error', durationTime: 3500, position: "top-center" });
        yield put(deleteDerivedQuestionFailure(error?.response?.data?.message));
    }
};
// Watcher generator function
export default function* watchQuestion() {
    yield takeLatest('questionSlice/addQuestionRequest', addQuestionSaga);
    yield takeLatest('questionSlice/getAllQuestionRequest', getAllQuestionSaga);
    yield takeLatest('questionSlice/getQuestionRequest', getQuestionSaga);
    yield takeLatest('questionSlice/updateQuestionRequest', updateQuestionSaga);
    yield takeLatest('questionSlice/deleteQuestionRequest', deleteQuestionSaga);
    yield takeLatest('questionSlice/deleteDerivedQuestionRequest', deleteDerivedQuestionSaga);
};