import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse, SagaGenerator } from "../../../types/common";
import { showToast } from "../../utils/Toast";
import {
    ADDSHIFT,
    DELETESHIFT,
    GETALLSHIFTS,
    GETSHIFT,
    UPDATESHIFT
} from "../api/Api";
import {
    addShiftFailure,
    addShiftSuccess,
    deleteShiftFailure,
    deleteShiftSuccess,
    getAllShiftFailure,
    getAllShiftRequest,
    getAllShiftSuccess,
    getShiftFailure,
    getShiftSuccess,
    updateShiftFailure,
    updateShiftSuccess
} from "../reducers/ShiftReducers";
import { TShift, TShiftAPIResponse, TShiftPayload } from "../../../types/shiftTypes";


// addShiftSaga generator function
export function* addShiftSaga({ payload, type }: { payload: { data: TShiftPayload, reset: () => void }, type: string }): SagaGenerator<{ data: ApiResponse<TShift> }> {
    try {
        const resp = yield call(ADDSHIFT, payload?.data);
        const result: ApiResponse<TShift> = resp?.data;
        if (result?.success) {
            yield put(addShiftSuccess(result));
            payload?.reset();
            showToast({ message: result?.message || 'New shift added.', type: 'success', durationTime: 3500, position: "top-center" });
            yield put(getAllShiftRequest('shiftSlice/getAllShiftRequest'));
        };
    } catch (error: any) {
        showToast({ message: error?.response?.data?.message, type: 'error', durationTime: 3500, position: "top-center" });
        yield put(addShiftFailure(error?.response?.data?.message));
    };
};

// getAllShiftSaga generator function
export function* getAllShiftSaga({ type }: { type: string }): SagaGenerator<{ data: ApiResponse<TShiftAPIResponse> }> {
    try {
        const resp = yield call(GETALLSHIFTS);
        const result: ApiResponse<TShiftAPIResponse> = resp?.data;
        if (result?.success) {
            yield put(getAllShiftSuccess(result));
        };
    } catch (error: any) {
        yield put(getAllShiftFailure(error?.response?.data?.message));
    };
};

// getShiftSaga generator function
export function* getShiftSaga({ payload, type }: { payload: { shiftId: string }, type: string }): SagaGenerator<{ data: ApiResponse<TShift> }> {
    try {
        const resp = yield call(GETSHIFT, payload?.shiftId);
        const result: ApiResponse<TShift> = resp?.data;
        if (result?.success) {
            yield put(getShiftSuccess(result));
        };
    } catch (error: any) {
        yield put(getShiftFailure(error?.response?.data?.message));
        showToast({ message: error?.response?.data?.message, type: 'error', durationTime: 3500, position: "top-center" });
    };
};

// updateShiftSaga generator function
export function* updateShiftSaga({ payload, type }: { payload: { data: TShiftPayload, reset: () => void, shiftId: string }, type: string }): SagaGenerator<{ data: ApiResponse<TShift> }> {
    try {
        const resp = yield call(UPDATESHIFT, payload?.shiftId, payload?.data);
        const result: ApiResponse<TShift> = resp?.data;
        if (result?.success) {
            yield put(updateShiftSuccess(result));
            payload?.reset();

            showToast({ message: result?.message || 'Shift updated successfully.', type: 'success', durationTime: 3500, position: "top-center" });
            yield put(getAllShiftRequest('shiftSlice/getAllShiftRequest'));
        };
    } catch (error: any) {
        showToast({ message: error?.response?.data?.message, type: 'error', durationTime: 3500, position: "top-center" });
        yield put(updateShiftFailure(error?.response?.data?.message));
    };
};

// deleteShiftSaga generator function
export function* deleteShiftSaga({ payload, type }: { payload: { shiftId: string }, type: string }): SagaGenerator<{ data: ApiResponse<null> }> {
    try {
        const resp = yield call(DELETESHIFT, payload?.shiftId);
        const result: ApiResponse<null> = resp?.data;
        if (result?.success) {
            yield put(deleteShiftSuccess(result));
            showToast({ message: result?.message || 'Category deleted.', type: 'success', durationTime: 3500, position: "top-center" });
            yield put(getAllShiftRequest('shiftSlice/getAllShiftRequest'));
        };
    } catch (error: any) {
        showToast({ message: error?.response?.data?.message, type: 'error', durationTime: 3500, position: "top-center" });
        yield put(deleteShiftFailure(error?.response?.data?.message));
    };
};


// Watcher generator function
export default function* watchShift() {
    yield takeLatest('shiftSlice/addShiftRequest', addShiftSaga);
    yield takeLatest('shiftSlice/getAllShiftRequest', getAllShiftSaga);
    yield takeLatest('shiftSlice/getShiftRequest', getShiftSaga);
    yield takeLatest('shiftSlice/updateShiftRequest', updateShiftSaga);
    yield takeLatest('shiftSlice/deleteShiftRequest', deleteShiftSaga);
};