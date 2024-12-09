import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator } from "../../../types/common";
import { showToast } from "../../utils/Toast";
import {
    getUserDetailsSuccess,
    getUserDetailsFailure,
    verifyServiceProviderUserDetailsSuccess,
    verifyServiceProviderUserDetailsFailure,
    getUserDetailsRequest,
    AddAdminUserSuccess,
    AddAdminUserFailure
} from "../reducers/UserReducers";
import { ADDADMINUSER, USERDETAILS, VERIFYSERVICEPROVEIDER } from "../api/Api";
import { TUserDetailsAPIResponse } from "../../../types/userTypes";
import { AddAdminUserFormData } from "../../components/core/AddAdminUser";
import { User } from "../../../types/authTypes";
import { UseFormReset } from "react-hook-form";


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

// addAdminUserSaga generator function
export function* addAdminUserSaga({ payload, type }: { payload: { data: AddAdminUserFormData, reset: UseFormReset<AddAdminUserFormData> }, type: string }): SagaGenerator<{ data: ApiResponse<User> }> {
    try {
        const resp = yield call(ADDADMINUSER, payload?.data);
        const result: ApiResponse<User> = resp?.data;

        if (result?.success) {
            yield put(AddAdminUserSuccess(result));
            payload?.reset();
            showToast({ message: resp?.data?.message, type: 'success', durationTime: 3500, position: "top-center" });
        };
    } catch (error: any) {
        yield put(AddAdminUserFailure(error?.response?.data?.message));
        showToast({ message: error?.response?.data?.message, type: 'error', durationTime: 3500, position: "bottom-center" });
    };
};


// Watcher generator function
export default function* watchUser() {
    yield takeLatest('userSlice/getUserDetailsRequest', getUserDetailsSaga);
    yield takeLatest('userSlice/verifyServiceProviderUserDetailsRequest', verifyServiceProviderSaga);
    yield takeLatest('userSlice/AddAdminUserRequest', addAdminUserSaga);
};