import { put, call, takeEvery} from "redux-saga/effects";
import { fetchCharacterData } from "../services/networkService";
import * as actionTypes from "../actions/actionTypes";
import * as actionCreators from "../actions/actionCreators";
import { CharacterFilterModel, CharacterResponseModel } from "../model";


export default function* characterSaga() {
    yield takeEvery(actionTypes.CHARACTER_FETCH_DATA, sagaFetchCharacterData);
}

function* sagaFetchCharacterData({ payload }: actionTypes.CharacterFetchDataAction) {
    try {
        const { data } = yield call(fetchCharacterData, payload);
        let characterDataResponse: CharacterResponseModel = {
            ListCharacterData: data
        }
        yield put(actionCreators.characterFetchDataSuccess(characterDataResponse));
    } catch (error) {
        console.log(error);
        //yield put(actionCreators.bookFetchDataFailure(error.response.data.error));
    }
}