import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../../types/common";

const initialState: DataState = {
    singleServiceData: {},
    error: null,
    type: '',
    allServiceData: [],
    allServiceProviderData: [],
    serviceRequestTableData:[],
    serviceTableTotalElems: 0
};

const ServiceSlice = createSlice({
    name: "serviceSlice",
    initialState,
    reducers: {
        // Get Services
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
        getServiceTableDataRequest: (state, { payload, type }) => {
            state.type = type;
        },
        getServiceTableDataRequestSuccess: (state, { payload, type }) => {
            // console.log({payload})
            state.type = type;
            state.serviceRequestTableData = payload?.data?.serviceRequests;
            state.serviceTableTotalElems = payload?.data?.pagination?.totalRecords;
        },
        getServiceTableDataRequestFailure: (state, { payload, type }) => {
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
    getServiceTableDataRequest,
    getServiceTableDataRequestSuccess,
    getServiceTableDataRequestFailure,
    getAllServiceProviderRequest,
    getAllServiceProviderSuccess,
    getAllServiceProviderFailure,
} = ServiceSlice.actions;

export default ServiceSlice.reducer;