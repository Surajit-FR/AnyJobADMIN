import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator } from "../../../types/common";
import { TCategoryPayload, TCategoryAPIResponse, TCategory } from "../../../types/categoryTypes";
import { ADDCATEGORY, DELETECATEGORY, GETALLCATEGORY, GETCATEGORY } from "../api/Api";
import { addCategoryFailure, addCategorySuccess, getAllCategoryFailure, getAllCategoryRequest, getAllCategorySuccess, getCategoryFailure, getCategorySuccess } from "../reducers/CategoryReducers";
import { showToast } from "../../utils/Toast";


// addCategorySaga generator function
export function* addCategorySaga({ payload, type }: { payload: { data: TCategoryPayload, reset: () => void }, type: string }): SagaGenerator<{ data: ApiResponse<TCategory> }> {
    try {
        const resp = yield call(ADDCATEGORY, payload?.data);
        const result: ApiResponse<TCategory> = resp?.data;
        if (result?.success) {
            yield put(addCategorySuccess(result));
            payload?.reset();
            showToast({ message: result?.message || 'New category added.', type: 'success', durationTime: 3500, position: "top-center" });
            yield put(getAllCategoryRequest('categorySlice/getAllCategoryRequest'));
        };
    } catch (error: any) {
        yield put(addCategoryFailure(error?.response?.data?.message));
    };
};

// getAllCategorySaga generator function
export function* getAllCategorySaga({ type }: { type: string }): SagaGenerator<{ data: ApiResponse<TCategoryAPIResponse> }> {
    try {
        const resp = yield call(GETALLCATEGORY);
        const result: ApiResponse<TCategoryAPIResponse> = resp?.data;
        if (result?.success) {
            yield put(getAllCategorySuccess(result));
        };
    } catch (error: any) {
        yield put(getAllCategoryFailure(error?.response?.data?.message));
    };
};

// getCategorySaga generator function
export function* getCategorySaga({ payload, type }: { payload: { categoryId: string }, type: string }): SagaGenerator<{ data: ApiResponse<TCategory> }> {
    try {
        const resp = yield call(GETCATEGORY, payload?.categoryId);
        const result: ApiResponse<TCategory> = resp?.data;
        if (result?.success) {
            yield put(getCategorySuccess(result));
        };
    } catch (error: any) {
        yield put(getCategoryFailure(error?.response?.data?.message));
        showToast({ message: error?.response?.data?.message, type: 'error', durationTime: 3500, position: "top-center" });
    };
};

// deleteCategorySaga generator function
export function* deleteCategorySaga({ payload, type }: { payload: { categoryId: string }, type: string }): SagaGenerator<{ data: ApiResponse<null> }> {
    try {
        const resp = yield call(DELETECATEGORY, payload?.categoryId);
        const result: ApiResponse<null> = resp?.data;
        if (result?.success) {
            yield put(getAllCategorySuccess(result));
            showToast({ message: result?.message || 'Category deleted.', type: 'success', durationTime: 3500, position: "top-center" });
            yield put(getAllCategoryRequest('categorySlice/getAllCategoryRequest'));
        };
    } catch (error: any) {
        yield put(getAllCategoryFailure(error?.response?.data?.message));
    };
};


// Watcher generator function
export default function* watchCategory() {
    yield takeLatest('categorySlice/addCategoryRequest', addCategorySaga);
    yield takeLatest('categorySlice/getAllCategoryRequest', getAllCategorySaga);
    yield takeLatest('categorySlice/getCategoryRequest', getCategorySaga);
    yield takeLatest('categorySlice/deleteCategoryRequest', deleteCategorySaga);
};