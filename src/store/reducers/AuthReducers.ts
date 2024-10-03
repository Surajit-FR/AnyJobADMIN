import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../../types/common";

const initialState: DataState = {
    authData: {},
    error: null,
    type: ''
};

const AuthSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        // Login
        AuthLoginRequest: (state, { payload, type }) => {
            state.type = type;
        },
        AuthLoginSuccess: (state, { payload, type }) => {
            state.type = type;
        },
        AuthLoginFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },

        // Logout
        AuthLogoutRequest: (state, { payload, type }) => {
            state.type = type;
        },
        AuthLogoutSuccess: (state, { payload, type }) => {
            state.type = type;
        },
        AuthLogoutFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },
    }
});

export const {
    AuthLoginRequest,
    AuthLoginSuccess,
    AuthLoginFailure,
    AuthLogoutRequest,
    AuthLogoutSuccess,
    AuthLogoutFailure,
} = AuthSlice.actions;

export default AuthSlice.reducer;