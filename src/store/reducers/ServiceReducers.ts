import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../../types/common";

const initialState: DataState = {
    singleServiceData: {},
    error: null,
    type: '',
    allServiceData: [],
    allServiceProviderData: []
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
        getAllServiceRequest: (state, { payload, type }) => {
            state.type = type;
        },
        getAllServiceSuccess: (state, { payload, type }) => {
            state.type = type;
            state.allServiceData = payload?.data?.serviceRequests;
        },
        getAllServiceFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },
        getAllServiceProviderRequest: (state, { payload, type }) => {
            state.type = type;
        },
        getAllServiceProviderSuccess: (state, { payload, type }) => {
            state.type = type;
            state.allServiceProviderData = payload?.data?.serviceProviders;
        },
        getAllServiceProviderFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },
    }
});

export const {
    getServiceRequest,
    getServiceSuccess,
    getServiceFailure,
    getAllServiceRequest,
    getAllServiceSuccess,
    getAllServiceFailure,
    getAllServiceProviderRequest,
    getAllServiceProviderSuccess,
    getAllServiceProviderFailure,
} = ServiceSlice.actions;

export default ServiceSlice.reducer;