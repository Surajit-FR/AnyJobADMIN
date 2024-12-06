import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator } from "../../../types/common";
import { FETCHSERVICEREQDETAILS } from "../api/Api";
import {
    getServiceFailure,
    getServiceSuccess
} from "../reducers/ServiceReducers";
import { ServiceRequest } from "../../../types/services";


// getServiceSaga generator function
export function* getServiceSaga({ payload, type }: { payload: { serviceId: string }, type: string }): SagaGenerator<{ data: ApiResponse<ServiceRequest> }> {
    try {
        const resp = yield call(FETCHSERVICEREQDETAILS, payload?.serviceId);
        const result: ApiResponse<ServiceRequest> = resp?.data;
        if (result?.success) {
            yield put(getServiceSuccess(result));
        }
    } catch (error: any) {
        yield put(getServiceFailure(error?.response?.data?.message));
    }
};

// Watcher generator function
export default function* watchService() {
    yield takeLatest('serviceSlice/getServiceRequest', getServiceSaga);
};