import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../../types/common";

const initialState: DataState = {
    shiftData: [],
    singleShiftData: {},
    error: null,
    type: ''
};

const ShiftSlice = createSlice({
    name: "shiftSlice",
    initialState,
    reducers: {
        // Add Shift
        addShiftRequest: (state, { payload, type }) => {
            state.type = type;
        },
        addShiftSuccess: (state, { payload, type }) => {
            state.type = type;
        },
        addShiftFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },

        // Get all Shift
        getAllShiftRequest: (state, { payload, type }) => {
            state.type = type;
        },
        getAllShiftSuccess: (state, { payload, type }) => {
            state.type = type;
            state.shiftData = payload?.data;
        },
        getAllShiftFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },

        // Get Shift
        getShiftRequest: (state, { payload, type }) => {
            state.type = type;
        },
        getShiftSuccess: (state, { payload, type }) => {
            state.type = type;
            state.singleShiftData = payload?.data;
        },
        getShiftFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },

        // Update Shift
        updateShiftRequest: (state, { payload, type }) => {
            state.type = type;
        },
        updateShiftSuccess: (state, { payload, type }) => {
            state.type = type;
        },
        updateShiftFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },

        // Delete Shift
        deleteShiftRequest: (state, { payload, type }) => {
            state.type = type;
        },
        deleteShiftSuccess: (state, { payload, type }) => {
            state.type = type;
        },
        deleteShiftFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },
    }
});

export const {
    addShiftRequest,
    addShiftSuccess,
    addShiftFailure,

    getShiftRequest,
    getShiftSuccess,
    getShiftFailure,

    getAllShiftRequest,
    getAllShiftSuccess,
    getAllShiftFailure,

    updateShiftRequest,
    updateShiftSuccess,
    updateShiftFailure,

    deleteShiftRequest,
    deleteShiftSuccess,
    deleteShiftFailure,
} = ShiftSlice.actions;

export default ShiftSlice.reducer;