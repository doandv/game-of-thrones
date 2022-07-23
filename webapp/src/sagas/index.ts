import { all } from "redux-saga/effects";
import bookSaga from "./bookSaga";
import characterSaga from "./characterSaga";
import houseSaga from "./houseSaga";

export function* rootSaga() {
    yield all([
        bookSaga(),
        characterSaga(),
        houseSaga()
    ])
}

