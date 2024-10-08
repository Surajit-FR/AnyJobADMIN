import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator } from "../../../types/common";
import { showToast } from "../../utils/Toast";
import { TQuestionAPIResponse } from "../../../types/questionTypes";
import { GETALLQUESTIONS } from "../api/Api";
import { getAllQuestionFailure, getAllQuestionSuccess } from "../reducers/QuestionReducers";


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
        showToast({ message: error?.response?.data?.message, type: 'error', durationTime: 3500, position: "top-center" });
    }
};


// Watcher generator function
export default function* watchQuestion() {
    yield takeLatest('questionSlice/getAllQuestionRequest', getAllQuestionSaga);
};