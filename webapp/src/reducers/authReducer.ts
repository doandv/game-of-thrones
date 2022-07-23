import * as actionTypes from "../actions/actionTypes";
import { UserInfoModel } from "../model";

export interface AuthStateModel {
    UserInfo: UserInfoModel
}

const initialState: AuthStateModel = {
    UserInfo: {
        userId: 0,
        userName: ""
    }
};

export default function authReducer(
    state: AuthStateModel = initialState,
    action: actionTypes.AppAction
): AuthStateModel {
    switch (action.type) {
        case actionTypes.AUTH_SET_USER_INFO:
            return {
                ...state,
                UserInfo: action.payload
            }
        default:
            return state;
    }
}
