import { put, call, takeEvery} from "redux-saga/effects";
import { fetchBookData } from "../services/networkService";
import * as actionTypes from "../actions/actionTypes";
import * as actionCreators from "../actions/actionCreators";
import { BookInfoModel, BookResponseModel } from "../model";


export default function* bookSaga() {
    yield takeEvery(actionTypes.BOOK_FETCH_DATA, sagaFetchBookData);
}

function* sagaFetchBookData({ payload }: actionTypes.BookFetchDataAction) {
    try {
        const { data } = yield call(fetchBookData, payload);
        let bookDataResponse: BookResponseModel = {
            ListBookData: data
        }
        yield put(actionCreators.bookFetchDataSuccess(bookDataResponse));
    } catch (error) {
        console.log(error);
        //yield put(actionCreators.bookFetchDataFailure(error.response.data.error));
    }
}