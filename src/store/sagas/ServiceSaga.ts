import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator } from "../../../types/common";
import { FETCHSERVICEREQDETAILS, GETALLSERVICEPROVIDER, GETALLSERVICES } from "../api/Api";
import {
    getAllServiceFailure,
    getAllServiceProviderFailure,
    getAllServiceProviderSuccess,
    getAllServiceSuccess,
    getServiceFailure,
    getServiceSuccess,
    getServiceTableDataRequestFailure,
    getServiceTableDataRequestSuccess,

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

export function* getAllServiceSaga({ payload, type }: {
    payload: {
        params: {
            page?: number,
            limit: number,
            query: '',
            sortBy: "",
            sortType: "asc"
        }
    }, type: string
}): SagaGenerator<{ data: ApiResponse<ServiceRequest> }> {
    try {
        const resp = yield call(GETALLSERVICES, payload?.params);
        const result: ApiResponse<ServiceRequest> = resp?.data;
        if (result?.success) {
            yield put(getAllServiceSuccess(result));
        }
    } catch (error: any) {
        yield put(getAllServiceFailure(error?.response?.data?.message));
    }
};

export function* getServiceRequstTableSaga({ payload, type }: {
    payload: {
        params: {
            page?: number,
            limit?: number,
            query?: '',
            sortBy?: "",
            sortType?: string
        }
    }, type: string
}): SagaGenerator<{ data: ApiResponse<ServiceRequest> }> {

    try {
        const resp = yield call(GETALLSERVICES, payload?.params);
        const result: ApiResponse<ServiceRequest> = resp?.data;
        if (result?.success) {
            yield put(getServiceTableDataRequestSuccess(result));
        }
    } catch (error: any) {
        yield put(getServiceTableDataRequestFailure(error?.response?.data?.message));
    }
};

export function* getAllServiceProviderSaga({ payload, type }: {
    payload: {
        params: {
            page?: number,
            limit: number,
            query: '',
            sortBy: "",
            sortType: "asc"
        }
    }, type: string
}): SagaGenerator<{ data: ApiResponse<ServiceRequest> }> {
    try {
        const resp = yield call(GETALLSERVICEPROVIDER, payload?.params);
        const result: ApiResponse<ServiceRequest> = resp?.data;
        if (result?.success) {
            yield put(getAllServiceProviderSuccess(result));
        }
    } catch (error: any) {
        yield put(getAllServiceProviderFailure(error?.response?.data?.message));
    }
};


// Watcher generator function
export default function* watchService() {
    yield takeLatest('serviceSlice/getServiceRequest', getServiceSaga);
    yield takeLatest('serviceSlice/getAllServiceRequest', getAllServiceSaga);
    yield takeLatest('serviceSlice/getAllServiceProviderRequest', getAllServiceProviderSaga);
    yield takeLatest('serviceSlice/getServiceTableDataRequest', getServiceRequstTableSaga);
};