import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator } from "../../../types/common";
import { AddSubCategoryResponse, GetAllSubcategoryParams, TSubCategory, TSubCategoryPayload, TSubCategoryResponse } from "../../../types/subCategoryTypes";
import { showToast } from "../../utils/Toast";
import {
    ADDSUBCATEGORY,
    DELETESUBCATEGORY,
    GETALLSUBCATEGORY,
    GETSUBCATEGORY,
    UPDATESUBCATEGORY
} from "../api/Api";
import {
    addSubCategoryFailure,
    addSubCategorySuccess,
    deleteSubCategoryFailure,
    deleteSubCategorySuccess,
    getAllSubCategoryFailure,
    getAllSubCategoryRequest,
    getAllSubCategorySuccess,
    getSubCategoryFailure,
    getSubCategorySuccess,
    updateSubCategoryFailure,
    updateSubCategorySuccess
} from "../reducers/SubCategoryReducers";


// addSubCategorySaga generator function
export function* addSubCategorySaga({ payload, type }: { payload: { data: TSubCategoryPayload, reset: () => void }, type: string }): SagaGenerator<{ data: ApiResponse<AddSubCategoryResponse> }> {
    try {
        const resp = yield call(ADDSUBCATEGORY, payload?.data);
        const result: ApiResponse<AddSubCategoryResponse> = resp?.data;
        if (result?.success) {
            yield put(addSubCategorySuccess(result));
            payload?.reset();
            showToast({ message: result?.message || 'New sub category added.', type: 'success', durationTime: 3500, position: "top-center" });
        };
    } catch (error: any) {
        yield put(addSubCategoryFailure(error?.response?.data?.message));
        showToast({ message: error?.response?.data?.message, type: 'error', durationTime: 3500, position: "top-center" });
    };
};

// getAllSubCategorySaga generator function
export function* getAllSubCategorySaga({ payload, type }: { payload: GetAllSubcategoryParams, type: string }): SagaGenerator<{ data: ApiResponse<TSubCategoryResponse> }> {
    try {
        const resp = yield call(GETALLSUBCATEGORY, payload);
        const result: ApiResponse<TSubCategoryResponse> = resp?.data;
        if (result?.success) {
            yield put(getAllSubCategorySuccess(result));
        };
    } catch (error: any) {
        yield put(getAllSubCategoryFailure(error?.response?.data?.message));
    };
};

// getSubCategorySaga generator function
export function* getSubCategorySaga({ payload, type }: { payload: { SubCategoryId: string }, type: string }): SagaGenerator<{ data: ApiResponse<TSubCategory> }> {
    try {
        const resp = yield call(GETSUBCATEGORY, payload?.SubCategoryId);
        const result: ApiResponse<TSubCategory> = resp?.data;
        if (result?.success) {
            yield put(getSubCategorySuccess(result));
        };
    } catch (error: any) {
        yield put(getSubCategoryFailure(error?.response?.data?.message));
        showToast({ message: error?.response?.data?.message, type: 'error', durationTime: 3500, position: "top-center" });
    };
};

// updateSubCategorySaga generator function
export function* updateSubCategorySaga({ payload, type }: { payload: { data: TSubCategoryPayload, reset: () => void, categoryId: string, SubCategoryId: string }, type: string }): SagaGenerator<{ data: ApiResponse<TSubCategory> }> {
    try {
        const resp = yield call(UPDATESUBCATEGORY, payload?.data, payload?.SubCategoryId);
        const result: ApiResponse<TSubCategory> = resp?.data;
        if (result?.success) {
            yield put(updateSubCategorySuccess(result));
            payload?.reset();
            showToast({ message: result?.message || 'Category updated successfully.', type: 'success', durationTime: 3500, position: "top-center" });
            yield put(getAllSubCategoryRequest({ categoryId: payload?.categoryId }));
        };
    } catch (error: any) {
        yield put(updateSubCategoryFailure(error?.response?.data?.message));
    };
};

// deleteSubCategorySaga generator function
export function* deleteSubCategorySaga({ payload, type }: { payload: { categoryId: string, SubCategoryId: string }, type: string }): SagaGenerator<{ data: ApiResponse<null> }> {
    try {
        const resp = yield call(DELETESUBCATEGORY, payload?.SubCategoryId);
        const result: ApiResponse<null> = resp?.data;
        if (result?.success) {
            yield put(deleteSubCategorySuccess(result));
            showToast({ message: result?.message || 'Sub Category deleted.', type: 'success', durationTime: 3500, position: "top-center" });
            yield put(getAllSubCategoryRequest({ categoryId: payload?.categoryId }));
        };
    } catch (error: any) {
        yield put(deleteSubCategoryFailure(error?.response?.data?.message));
    };
};


// Watcher generator function
export default function* watchSubCategory() {
    yield takeLatest('subCategorySlice/addSubCategoryRequest', addSubCategorySaga);
    yield takeLatest('subCategorySlice/getAllSubCategoryRequest', getAllSubCategorySaga);
    yield takeLatest('subCategorySlice/getSubCategoryRequest', getSubCategorySaga);
    yield takeLatest('subCategorySlice/updateSubCategoryRequest', updateSubCategorySaga);
    yield takeLatest('subCategorySlice/deleteSubCategoryRequest', deleteSubCategorySaga);
};