import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator } from "../../../types/common";
import { GETALLIPLOGS, GETIPDETAILFORUSER, POSTIPLOGDETAILS } from "../api/Api";
import { showToast } from "../../utils/Toast";
import { getIncomingUserIprequestSuccess, getIpDataRequestFailure, getIpDataRequestSuccess } from "../reducers/IpReducers";

export function* IpGetSaga({ payload, type }: { payload: { data: any, }, type: string }): SagaGenerator<{ data: ApiResponse<any> }> {
    try {
        console.log("ist trigered", payload)
        const resp = yield call(GETALLIPLOGS, payload.data);
        const result: ApiResponse<any> = resp?.data;
        console.log({ result })
        if (result?.success) {
            showToast({ message: result?.message || 'Data retrieved Successfully.', type: 'success', durationTime: 3500, position: "top-center" });
            yield put(getIpDataRequestSuccess(result?.data));
        };
    } catch (error: any) {
        yield put(getIpDataRequestFailure(error?.response?.data?.message));
        showToast({ message: error?.response?.data?.message || 'failed.', type: 'error', durationTime: 3500, position: "bottom-center" });
    };
};

export function* GetUserIpSagaFromExternal({ payload, type }: { payload: any, type: string }): SagaGenerator<{ data: ApiResponse<any> }> {
    try {
        const resp = yield call(GETIPDETAILFORUSER, payload);
        // const resp2 = JSON.parse(resp as unknown as string)
        //  console.log({resp, resp2})
        const result = resp?.data as unknown as string;
        const updatedResult = result.replaceAll(/\n\n/g, ',')
        .replaceAll(/\n/g, ',')
        .replaceAll(":", ':"')
        .replaceAll(",", '",')
        .replace("Country", '"country"')
        .replace("City", '"region"')
        .replace("Latitude", '"latitude"')
        .replace("Longitude", '"longitude"')
        .replace("IP", '"ipAddress"')
        try {
            const obj = JSON.parse("{" + updatedResult.substring(0, updatedResult.length - 1) + "}")

            if (obj) {
                yield put(getIncomingUserIprequestSuccess(obj))
            }
        }
        catch (e) {
            console.log(e)
        }
    } catch (error: any) {
        yield put(getIpDataRequestFailure("failed to get ip"));
        showToast({ message: error?.response?.data?.message || 'failed.', type: 'error', durationTime: 1000, position: "bottom-center" });
    };
};
export function* ExportIpdetails({ payload, type }: { payload: any, type: string }): SagaGenerator<{ data: ApiResponse<any> }> {
    try {
        console.log({payload})
        const resp = yield call(POSTIPLOGDETAILS, payload);
        // const resp2 = JSON.parse(resp as unknown as string)
        //  console.log({resp, resp2})
        const result = resp?.data
        if (result?.success) {
            showToast({ message: result?.message || 'Login Successfully.', type: 'success', durationTime: 3500, position: "top-center" });
            yield put(getIpDataRequestSuccess(result));
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
    yield takeLatest('IpSlice/exportIpDetailsRequest', ExportIpdetails);
};