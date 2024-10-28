import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator } from "../../../types/common";
import { showToast } from "../../utils/Toast";
import { getUserDetailsSuccess, getUserDetailsFailure, verifyServiceProviderUserDetailsSuccess, verifyServiceProviderUserDetailsFailure, getUserDetailsRequest } from "../reducers/UserReducers";
import { USERDETAILS, VERIFYSERVICEPROVEIDER } from "../api/Api";
import { TUserDetailsAPIResponse } from "../../../types/userTypes";


// getUserDetailsSaga generator function
export function* getUserDetailsSaga({ payload, type }: { payload: { userId: string }, type: string }): SagaGenerator<{ data: ApiResponse<TUserDetailsAPIResponse> }> {
    try {
        const resp = yield call(USERDETAILS, payload?.userId);
        const result: ApiResponse<TUserDetailsAPIResponse> = resp?.data;
        if (result?.success) {
            yield put(getUserDetailsSuccess(result));
        };
    } catch (error: any) {
        yield put(getUserDetailsFailure(error?.response?.data?.message));
        showToast({ message: error?.response?.data?.message, type: 'error', durationTime: 3500, position: "bottom-center" });
    };
};

// verifyServiceProviderSaga generator function
export function* verifyServiceProviderSaga({ payload, type }: { payload: { userId: string, isVerified: boolean }, type: string }): SagaGenerator<{ data: ApiResponse<TUserDetailsAPIResponse> }> {
    try {
        const resp = yield call(VERIFYSERVICEPROVEIDER, payload?.userId, payload?.isVerified);
        const result: ApiResponse<TUserDetailsAPIResponse> = resp?.data;
        if (result?.success) {
            yield put(verifyServiceProviderUserDetailsSuccess(result));
            yield put(getUserDetailsRequest({ userId: payload?.userId }))
            showToast({ message: resp?.data?.message, type: 'success', durationTime: 3500, position: "top-center" });
        };
    } catch (error: any) {
        yield put(verifyServiceProviderUserDetailsFailure(error?.response?.data?.message));
        showToast({ message: error?.response?.data?.message, type: 'error', durationTime: 3500, position: "bottom-center" });
    };
};

// Watcher generator function
export default function* watchUser() {
    yield takeLatest('userSlice/getUserDetailsRequest', getUserDetailsSaga);
    yield takeLatest('userSlice/verifyServiceProviderUserDetailsRequest', verifyServiceProviderSaga);
};