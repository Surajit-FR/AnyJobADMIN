import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    ipData: {},
    error: null,
    type: ''
};
const IpReducers = createSlice({
    name: "IpSlice",
    initialState,
    reducers: {
        // ip page
        getIpDataRequest: (state, { payload, type }) => {
            state.type = type;
        },
        getIpDataRequestSuccess: (state, { payload, type }) => {
            console.log("2nd trigered")
            state.type = type;
            state.ipData= payload;
        },
        getIpDataRequestFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },
    }
});

export const {
    getIpDataRequest,
    getIpDataRequestSuccess,
    getIpDataRequestFailure
} = IpReducers.actions;

export default IpReducers.reducer;