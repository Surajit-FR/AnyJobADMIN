import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator } from "../../../types/common";
import { LOGIN, LOGOUT } from "../api/Api";
import { AuthLoginFailure, AuthLoginSuccess, AuthLogoutFailure, AuthLogoutSuccess } from "../reducers/AuthReducers";
import { TLoginCredentials, UserData } from "../../../types/authTypes";
import { NavigateFunction } from "react-router-dom";
import { showToast } from "../../utils/Toast";


// loginSaga generator function
export function* loginSaga({ payload, type }: { payload: { data: TLoginCredentials, navigate: NavigateFunction }, type: string }): SagaGenerator<{ data: ApiResponse<UserData> }> {
    try {
        const resp = yield call(LOGIN, payload?.data);
        const result: ApiResponse<UserData> = resp?.data;
        if (result?.success) {
            payload.navigate("/dashboard");
            window.localStorage.setItem("accessToken", result?.data?.accessToken as string);
            window.localStorage.setItem("refreshToken", result?.data?.refreshToken as string);
            window.localStorage.setItem("role", result?.data?.user?.userType as string);
            window.localStorage.setItem("_id", result?.data?.user?._id as string);
            showToast({ message: result?.message || 'Login Successfully.', type: 'success', durationTime: 3500, position: "top-center" });
            yield put(AuthLoginSuccess(result));
        };
    } catch (error: any) {
        yield put(AuthLoginFailure(error?.response?.data?.message));
        showToast({ message: error?.response?.data?.message || 'Login failed.', type: 'error', durationTime: 3500, position: "bottom-center" });
    };
};

// logoutSaga generator function
export function* logoutSaga({ payload, type }: { payload: { navigate: NavigateFunction }, type: string }): SagaGenerator<{ data: ApiResponse<UserData> }> {
    try {
        const resp = yield call(LOGOUT);
        const result: ApiResponse<UserData> = resp?.data;
        if (result?.success) {
            window.localStorage.removeItem("accessToken");
            window.localStorage.removeItem("refreshToken");
            window.localStorage.removeItem("role");
            window.localStorage.removeItem("_id");   
            window.localStorage.removeItem("ipDetails")
            localStorage.clear()
            sessionStorage.clear()
            payload.navigate("/logout-page");
            showToast({ message: result?.message || 'Logout Successfully.', type: 'success', durationTime: 3500, position: "top-center" });
            yield put(AuthLogoutSuccess(result));
        };
    } catch (error: any) {
        yield put(AuthLogoutFailure(error?.response?.data?.message));
        showToast({ message: error?.response?.data?.message || 'Logout failed.', type: 'error', durationTime: 3500, position: "bottom-center" });
    };
};

// Watcher generator function
export default function* watchAuth() {
    yield takeLatest('authSlice/AuthLoginRequest', loginSaga);
    yield takeLatest('authSlice/AuthLogoutRequest', logoutSaga);
};