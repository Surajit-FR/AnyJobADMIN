import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator } from "../../../types/common";
import { GETALLREGISTEREDCUSTOMER } from "../api/Api";
import { getAllCustomerDataFailure, getAllCustomerDataRequst, getAllCustomerDataSuccess } from "../reducers/CustomerReducers";
import { ServiceRequest } from "../../../types/services";


export function* getAllCustomersSaga({ payload, type }: {
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
        const resp = yield call(GETALLREGISTEREDCUSTOMER, payload?.params);
        const result: ApiResponse<ServiceRequest> = resp?.data;
        if (result?.success) {
            yield put(getAllCustomerDataSuccess(result));
        }
    } catch (error: any) {
        yield put(getAllCustomerDataFailure(error?.response?.data?.message));
    }
};


// Watcher generator function
export default function* watchCustomer() {
    yield takeLatest('customerSlice/getAllCustomerDataRequst', getAllCustomersSaga);
};