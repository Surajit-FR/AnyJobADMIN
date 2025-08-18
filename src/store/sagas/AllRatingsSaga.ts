import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator, TransactionsData, UserRatingsData } from "../../../types/common";
import { GETALLREVIEWS } from "../api/Api";
import { getAllTransactionsRequestFailure, getAllTransactionsRequestSuccess } from "../reducers/TransactionReducers";


export function* getAllReviesSaga({ payload, type }: {
    payload: {
        params: {
            page?: number,
            limit: number,
            query: string,
            sortBy: "",
            sortType: "desc"
        }
    }, type: string
}): SagaGenerator<{ data: ApiResponse<UserRatingsData[]> }> {
    try {
        const resp = yield call(GETALLREVIEWS, payload?.params);
        const result: ApiResponse<UserRatingsData[]> = resp?.data;
        if (result?.success) {
            yield put(getAllTransactionsRequestSuccess(result));
        }
    } catch (error: any) {
        yield put(getAllTransactionsRequestFailure(error?.response?.data?.message));
    }
};


// Watcher generator function
export default function* watchRevies() {
    yield takeLatest('AllRatingSlice/getAllRatingsRequest', getAllReviesSaga);
};