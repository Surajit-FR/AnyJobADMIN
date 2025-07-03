import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, DashboardCardData, SagaGenerator } from "../../../types/common";
import { GETDASHBOARDCARDDATA } from "../api/Api";
import { getDashboardCardDataRequestFailure, getDashboardCardDataRequestSuccess } from "../reducers/DashboardReducer";


export function* getAllDashboardCardDataSaga({ type }: {
    type: string
}): SagaGenerator<{ data: ApiResponse<DashboardCardData> }> {
    try {
        const resp = yield call(GETDASHBOARDCARDDATA);
        const result: ApiResponse<DashboardCardData> = resp?.data;
        if (result?.success) {
            yield put(getDashboardCardDataRequestSuccess(result));
        }
    } catch (error: any) {
        yield put(getDashboardCardDataRequestFailure(error?.response?.data?.message));
    }
};


// Watcher generator function
export default function* watchDashboard() {
    yield takeLatest('DashboardSlice/getDashboardCardDataRequest', getAllDashboardCardDataSaga);
};