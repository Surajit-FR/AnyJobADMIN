import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../../types/common";

const initialState: DataState = {
    error: null,
    type: '',
    transactionData:[]
};

const TransactionSlice = createSlice({
    name: "TransactionSlice",
    initialState,
    reducers: {
        // Transactions Details
        getAllTransactionsRequest: (state, { payload, type }) => {
            state.type = type;
        },
        getAllTransactionsRequestSuccess: (state, { payload, type }) => {
            state.type = type;
            state.transactionData = payload?.data?.transactionsData;
        },
        getAllTransactionsRequestFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },
    }
});

export const {
    getAllTransactionsRequest,
    getAllTransactionsRequestSuccess,
    getAllTransactionsRequestFailure,
} = TransactionSlice.actions;

export default TransactionSlice.reducer;