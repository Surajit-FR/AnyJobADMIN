import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../../types/common";

const initialState: DataState = {
    singleServiceData: {},
    error: null,
    type: ''
};

const ServiceSlice = createSlice({
    name: "serviceSlice",
    initialState,
    reducers: {
        // Get question
        getServiceRequest: (state, { payload, type }) => {
            state.type = type;
        },
        getServiceSuccess: (state, { payload, type }) => {
            state.type = type;
            state.singleServiceData = payload?.data[0];
        },
        getServiceFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },
    }
});

export const {
    getServiceRequest,
    getServiceSuccess,
    getServiceFailure,
} = ServiceSlice.actions;

export default ServiceSlice.reducer;