import { put, call, takeEvery} from "redux-saga/effects";
import { fetchHouseData } from "../services/networkService";
import * as actionTypes from "../actions/actionTypes";
import * as actionCreators from "../actions/actionCreators";
import { HouseFilterModel, HouseResponseModel } from "../model";


export default function* houseSaga() {
    yield takeEvery(actionTypes.HOUSE_FETCH_DATA, sagaFetchHouseData);
}

function* sagaFetchHouseData({ payload }: actionTypes.HouseFetchDataAction) {
    try {
        const { data } = yield call(fetchHouseData, payload);
        let houseDataResponse: HouseResponseModel = {
            ListHouseData: data
        }
        yield put(actionCreators.houseFetchDataSuccess(houseDataResponse));
    } catch (error) {
        console.log(error);
        //yield put(actionCreators.bookFetchDataFailure(error.response.data.error));
    }
}