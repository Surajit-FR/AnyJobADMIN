import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator } from "../../../types/common";
import { showToast } from "../../utils/Toast";
import { getUserDetailsSuccess, getUserDetailsFailure } from "../reducers/UserReducers";
import { USERDETAILS } from "../api/Api";
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

// Watcher generator function
export default function* watchUser() {
    yield takeLatest('userSlice/getUserDetailsRequest', getUserDetailsSaga);
};