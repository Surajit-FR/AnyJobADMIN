import { all } from "redux-saga/effects";

import watchAuth from "./sagas/AuthSaga";
import watchCategory from "./sagas/CategorySaga";

export default function* rootSaga() {
    yield all([
        watchAuth(),
        watchCategory(),
    ])
}