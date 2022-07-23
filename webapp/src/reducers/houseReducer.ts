import * as actionTypes from "../actions/actionTypes";
import { HouseFilterModel, HouseResponseModel } from "../model";

export interface HouseStateModel {
    HouseFilter: HouseFilterModel,
    HouseData: HouseResponseModel
}

const initialState: HouseStateModel = {
    HouseFilter: {
        name: "",
        region: "",
        hasTitles: true,
        words: "",
        page: 1,
        paseSize: 10
    },
    HouseData: {
        ListHouseData: []
    }
};

export default function houseReducer(
    state: HouseStateModel = initialState,
    action: actionTypes.AppAction
): HouseStateModel {
    switch (action.type) {
        case actionTypes.HOUSE_CHANGE_FILTER:
            return {
                ...state,
                HouseFilter: action.payload
            }
        case actionTypes.HOUSE_FETCH_DATA_SUCCESS:
            return {
                ...state,
                HouseData: action.payload
            }
        default:
            return state;
    }
}
