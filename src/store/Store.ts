import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

import AuthSlice from "./reducers/AuthReducers";
import CategorySlice from "./reducers/CategoryReducers";
import QuestionSlice from "./reducers/QuestionReducers";
import ShiftSlice from "./reducers/ShiftReducers";
import UserSlice from "./reducers/UserReducers";
import ServiceSlice from "./reducers/ServiceReducers";
import CustomerSlice from "./reducers/CustomerReducers"
import IpReducers from "./reducers/IpReducers";


const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
    reducer: {
        authSlice: AuthSlice,
        categorySlice: CategorySlice,
        questionSlice: QuestionSlice,
        shiftSlice: ShiftSlice,
        userSlice: UserSlice,
        serviceSlice: ServiceSlice,
        customerSlice: CustomerSlice,
        ipSlice: IpReducers,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;