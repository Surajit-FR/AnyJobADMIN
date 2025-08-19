import { createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../../types/common";

const initialState: DataState = {
    error: null,
    type: '',
    allRatingsData:[]
};

const AllRatingSlice = createSlice({
    name: "AllRatingSlice",
    initialState,
    reducers: {
        // Transactions Details
        getAllRatingsRequest: (state, { payload, type }) => {
            state.type = type;
        },
        getAllRatingsRequestSuccess: (state, { payload, type }) => {
            state.type = type;
            state.allRatingsData = payload?.data?.userReviews;
        },
        getAllRatingsRequestFailure: (state, { payload, type }) => {
            state.type = type;
            state.error = payload;
        },
    }
});

export const {
    getAllRatingsRequest,
    getAllRatingsRequestSuccess,
    getAllRatingsRequestFailure,
} = AllRatingSlice.actions;

export default AllRatingSlice.reducer;