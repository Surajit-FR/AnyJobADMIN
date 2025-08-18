import { all } from "redux-saga/effects";

import watchAuth from "./sagas/AuthSaga";
import watchCategory from "./sagas/CategorySaga";
import watchQuestion from "./sagas/QuestionSaga";
import watchShift from "./sagas/ShiftSaga";
import watchUser from "./sagas/UserSaga";
import watchService from "./sagas/ServiceSaga";
import watchCustomer from "./sagas/CustomerSaga";
import watchIp from "./sagas/IpSaga";
import watchTransaction from "./sagas/TransactionsSaga";
import watchDashboard from "./sagas/DashboardSaga";
import watchRevies from "./sagas/AllRatingsSaga";

export default function* rootSaga() {
    yield all([
        watchAuth(),
        watchCategory(),
        watchQuestion(),
        watchShift(),
        watchUser(),
        watchService(),
        watchCustomer(),
        watchIp(),
        watchTransaction(),
        watchDashboard(),
        watchRevies(),
    ])
}