import { all } from "redux-saga/effects";

import watchAuth from "./sagas/AuthSaga";
import watchCategory from "./sagas/CategorySaga";
import watchSubCategory from "./sagas/SubCategorySaga";
import watchQuestion from "./sagas/QuestionSaga";

export default function* rootSaga() {
    yield all([
        watchAuth(),
        watchCategory(),
        watchSubCategory(),
        watchQuestion(),
    ])
}