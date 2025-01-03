import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../../types/common";


const initialState: DataState = {
    error: null,
    type: '',
    allCustomerData:[]
}

const customerSlice = createSlice({
    name: "customerSlice",
    initialState,
    reducers: {
        getAllCustomerDataRequst: (state, { payload, type }) => {
            state.type = type;
        },
        getAllCustomerDataSuccess: (state, { payload, type }) => {
            state.type = type;
            state.allCustomerData = payload?.data?.customers;
        },
        getAllCustomerDataFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },
    }

})

export const {
    getAllCustomerDataRequst,
    getAllCustomerDataSuccess,
    getAllCustomerDataFailure,
} = customerSlice.actions;

export default customerSlice.reducer;