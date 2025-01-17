import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../../types/common";

const initialState: DataState = {
    ipData: {
        ip: "",
        network: "",
        version: "",
        city: "",
        region: "",
        region_code: "",
        country: "",
        country_name: "",
        country_code: "",
        country_code_iso3: "",
        country_capital: "",
        country_tld: "",
        continent_code: "",
        in_eu: false,
        postal: 0,
        latitude: 0,
        longitude: 0,
        timezone: "",
        utc_offset: "",
        country_calling_code: "",
        currency: "",
        currency_name: "",
        languages: "",
        country_area: 0,
        country_population: 0,
        asn: "",
        org: "",
    },
    error: null,
    type: '',
    userIpInfo: {
        ip: "",
        network: "",
        version: "",
        city: "",
        region: "",
        region_code: "",
        country: "",
        country_name: "",
        country_code: "",
        country_code_iso3: "",
        country_capital: "",
        country_tld: "",
        continent_code: "",
        in_eu: false,
        postal: 0,
        latitude: 0,
        longitude: 0,
        timezone: "",
        utc_offset: "",
        country_calling_code: "",
        currency: "",
        currency_name: "",
        languages: "",
        country_area: 0,
        country_population: 0,
        asn: "",
        org: "",
    }
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
            state.type = type;
            state.ipData = payload;
        },
        getIpDataRequestFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },
        // get ip for incoming user
        getIncomingUserIprequest: (state, { payload, type }) => {
            state.type = type;
        },
        getIncomingUserIprequestSuccess: (state, { payload, type }) => {
            state.type = type;
            state.userIpInfo = payload;
        },
        getIncomingUserIprequestFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },
    }
});

export const {
    getIpDataRequest,
    getIpDataRequestSuccess,
    getIpDataRequestFailure,
    getIncomingUserIprequest,
    getIncomingUserIprequestSuccess,
    getIncomingUserIprequestFailure
} = IpReducers.actions;

export default IpReducers.reducer;