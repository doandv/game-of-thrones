import * as actionTypes from "../actions/actionTypes";
import { CharacterFilterModel, CharacterResponseModel } from "../model";

export interface CharacterStateModel {
    CharacterFilter: CharacterFilterModel,
    CharacterData: CharacterResponseModel
}

const initialState: CharacterStateModel = {
    CharacterFilter: {
        name: "",
        gender: "",
        culture: "",
        born: "",
        died: "",
        isAlive: false,
        page: 2, // because page 1 data bad
        paseSize: 10
    },
    CharacterData: {
        ListCharacterData: []
    }
};

export default function characterReducer(
    state: CharacterStateModel = initialState,
    action: actionTypes.AppAction
): CharacterStateModel {
    switch (action.type) {
        case actionTypes.CHARACTER_CHANGE_FILTER:
            return {
                ...state,
                CharacterFilter: action.payload
            }
        case actionTypes.CHARACTER_FETCH_DATA_SUCCESS:
            return {
                ...state,
                CharacterData: action.payload
            }
        default:
            return state;
    }
}
