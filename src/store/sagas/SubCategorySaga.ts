import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator } from "../../../types/common";
import { AddSubCategoryResponse, GetAllSubcategoryParams, TSubCategoryPayload, TSubCategoryResponse } from "../../../types/subCategoryTypes";
import { showToast } from "../../utils/Toast";
import { ADDSUBCATEGORY, GETALLSUBCATEGORY } from "../api/Api";
import {
    addSubCategoryFailure,
    addSubCategorySuccess,
    getAllSubCategoryFailure,
    // getAllSubCategoryRequest,
    getAllSubCategorySuccess
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

// getCategorySaga generator function
// export function* getCategorySaga({ payload, type }: { payload: { categoryId: string }, type: string }): SagaGenerator<{ data: ApiResponse<TCategory> }> {
//     try {
//         const resp = yield call(GETCATEGORY, payload?.categoryId);
//         const result: ApiResponse<TCategory> = resp?.data;
//         if (result?.success) {
//             yield put(getCategorySuccess(result));
//         };
//     } catch (error: any) {
//         yield put(getCategoryFailure(error?.response?.data?.message));
//         showToast({ message: error?.response?.data?.message, type: 'error', durationTime: 3500, position: "top-center" });
//     };
// };

// updateCategorySaga generator function
// export function* updateCategorySaga({ payload, type }: { payload: { data: TCategoryPayload, reset: () => void, categoryId: string }, type: string }): SagaGenerator<{ data: ApiResponse<TCategory> }> {
//     try {
//         const resp = yield call(UPDATECATEGORY, payload?.data, payload?.categoryId);
//         const result: ApiResponse<TCategory> = resp?.data;
//         if (result?.success) {
//             yield put(updateCategorySuccess(result));
//             payload?.reset();

//             showToast({ message: result?.message || 'Category updated successfully.', type: 'success', durationTime: 3500, position: "top-center" });
//             yield put(getAllCategoryRequest('categorySlice/getAllCategoryRequest'));
//         };
//     } catch (error: any) {
//         yield put(updateCategoryFailure(error?.response?.data?.message));
//     };
// };

// deleteCategorySaga generator function
// export function* deleteCategorySaga({ payload, type }: { payload: { categoryId: string }, type: string }): SagaGenerator<{ data: ApiResponse<null> }> {
//     try {
//         const resp = yield call(DELETECATEGORY, payload?.categoryId);
//         const result: ApiResponse<null> = resp?.data;
//         if (result?.success) {
//             yield put(getAllCategorySuccess(result));
//             showToast({ message: result?.message || 'Category deleted.', type: 'success', durationTime: 3500, position: "top-center" });
//             yield put(getAllCategoryRequest('categorySlice/getAllCategoryRequest'));
//         };
//     } catch (error: any) {
//         yield put(getAllCategoryFailure(error?.response?.data?.message));
//     };
// };


// Watcher generator function
export default function* watchSubCategory() {
    yield takeLatest('subCategorySlice/addSubCategoryRequest', addSubCategorySaga);
    yield takeLatest('subCategorySlice/getAllSubCategoryRequest', getAllSubCategorySaga);
    // yield takeLatest('categorySlice/getCategoryRequest', getCategorySaga);
    // yield takeLatest('categorySlice/updateCategoryRequest', updateCategorySaga);
    // yield takeLatest('categorySlice/deleteCategoryRequest', deleteCategorySaga);
};