import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator, TransactionsData } from "../../../types/common";
import { GETALLTTANSACTIONS } from "../api/Api";
import { getAllTransactionsRequestFailure, getAllTransactionsRequestSuccess } from "../reducers/TransactionReducers";


export function* getAllTransactionsSaga({ payload, type }: {
    payload: {
        params: {
            page?: number,
            limit: number,
            query: string,
            sortBy: "",
            sortType: "desc"
        }
    }, type: string
}): SagaGenerator<{ data: ApiResponse<TransactionsData[]> }> {
    try {
        const resp = yield call(GETALLTTANSACTIONS, payload?.params);
        const result: ApiResponse<TransactionsData[]> = resp?.data;
        if (result?.success) {
            yield put(getAllTransactionsRequestSuccess(result));
        }
    } catch (error: any) {
        yield put(getAllTransactionsRequestFailure(error?.response?.data?.message));
    }
};


// Watcher generator function
export default function* watchTransaction() {
    yield takeLatest('TransactionSlice/getAllTransactionsRequest', getAllTransactionsSaga);
};