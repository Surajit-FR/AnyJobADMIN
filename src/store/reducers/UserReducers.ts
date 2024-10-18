import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../../types/common";

const initialState: DataState = {
    userData: {},
    error: null,
    type: ''
};

const UserSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        // User Details
        getUserDetailsRequest: (state, { payload, type }) => {
            state.type = type;
        },
        getUserDetailsSuccess: (state, { payload, type }) => {
            state.type = type;
            state.userData = payload?.data;
        },
        getUserDetailsFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },
    }
});

export const {
    getUserDetailsRequest,
    getUserDetailsSuccess,
    getUserDetailsFailure,
} = UserSlice.actions;

export default UserSlice.reducer;