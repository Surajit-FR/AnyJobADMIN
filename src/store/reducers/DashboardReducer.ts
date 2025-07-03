import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../../types/common";

const initialState: DataState = {
    error: null,
    type: '',
    dashboardCardData: {
        totalCustomer: 0,
        totalServiceProvider: 0,
        totalGeneratedService: 0,
        balance: {
            avilable: 0,
            pending: 0
        },
    }
};

const DashboardSlice = createSlice({
    name: "DashboardSlice",
    initialState,
    reducers: {
        // Transactions Details
        getDashboardCardDataRequest: (state, { payload, type }) => {
            state.type = type;
        },
        getDashboardCardDataRequestSuccess: (state, { payload, type }) => {
            state.type = type;
            state.dashboardCardData = payload?.data;
        },
        getDashboardCardDataRequestFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },
    }
});

export const {
    getDashboardCardDataRequest,
    getDashboardCardDataRequestSuccess,
    getDashboardCardDataRequestFailure,
} = DashboardSlice.actions;

export default DashboardSlice.reducer;