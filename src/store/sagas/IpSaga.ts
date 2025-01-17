import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator } from "../../../types/common";
import { GETALLIPLOGS, GETIPDETAILFORUSER } from "../api/Api";
import { showToast } from "../../utils/Toast";
import { getIncomingUserIprequestSuccess, getIpDataRequestFailure, getIpDataRequestSuccess } from "../reducers/IpReducers";

export function* IpGetSaga({ payload, type }: { payload: { data: any,  }, type: string }): SagaGenerator<{ data: ApiResponse<any> }> {
    try {
        const resp = yield call(GETALLIPLOGS, payload?.data);
        console.log("ist trigered", payload)
        const result: ApiResponse<any> = resp?.data;
        console.log({result})
        if (result?.success) {
            showToast({ message: result?.message || 'Login Successfully.', type: 'success', durationTime: 3500, position: "top-center" });
            yield put(getIpDataRequestSuccess(result));
        };
    } catch (error: any) {
        yield put(getIpDataRequestFailure(error?.response?.data?.message));
        showToast({ message: error?.response?.data?.message || 'failed.', type: 'error', durationTime: 3500, position: "bottom-center" });
    };
};

export function* GetUserIpSagaFromExternal({  type }:  {type: string }): SagaGenerator<{ data: ApiResponse<any> }> {
    try {
        const resp = yield call(GETIPDETAILFORUSER);
        console.log("ist trigered", resp)
        const result: ApiResponse<any> = resp?.data;
        console.log({result})
        if (result) {
            // showToast({ message: result?.message || 'Login Successfully.', type: 'success', durationTime: 3500, position: "top-center" });
            yield put(getIncomingUserIprequestSuccess(result));
        };
    } catch (error: any) {
        yield put(getIpDataRequestFailure("failed to get ip"));
        showToast({ message: error?.response?.data?.message || 'failed.', type: 'error', durationTime: 1000, position: "bottom-center" });
    };
};

// Watcher generator function
export default function* watchIp() {
    yield takeLatest('IpSlice/getIpDataRequest', IpGetSaga);
    yield takeLatest('IpSlice/getIncomingUserIprequest', GetUserIpSagaFromExternal);
};