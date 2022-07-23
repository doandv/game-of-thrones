import { BookFilterModel, BookResponseModel, CharacterFilterModel, CharacterResponseModel, HouseFilterModel, HouseResponseModel, UserInfoModel } from '../model';
import * as actions from './actionTypes';

export function authSetUserInfo(userInfo:UserInfoModel): actions.AuthSetUserInfoAction {
    return {
        type: actions.AUTH_SET_USER_INFO,
        payload: userInfo
    }
}

/* #region Book */
export function bookChangeFilter(filterModel: BookFilterModel): actions.BookChangeFilterAction {
    return {
        type: actions.BOOK_CHANGE_FILTER,
        payload: filterModel
    }
}

export function bookFetchData(filterModel: BookFilterModel): actions.BookFetchDataAction {
    return {
        type: actions.BOOK_FETCH_DATA,
        payload: filterModel
    }
}

export function bookFetchDataSuccess(data: BookResponseModel): actions.BookFetchDataSuccessAction {
    return {
        type: actions.BOOK_FETCH_DATA_SUCCESS,
        payload: data
    }
}

export function bookFetchDataFailure(error: Error | string): actions.BookFetchDataFailureAction {
    return {
        type: actions.BOOK_FETCH_DATA_FAILURE,
        payload: error
    }
}
/* #endregion Book */

/* #region Character */
export function characterChangeFilter(filterModel: CharacterFilterModel): actions.CharacterChangeFilterAction {
    return {
        type: actions.CHARACTER_CHANGE_FILTER,
        payload: filterModel
    }
}

export function characterFetchData(filterModel: CharacterFilterModel): actions.CharacterFetchDataAction {
    return {
        type: actions.CHARACTER_FETCH_DATA,
        payload: filterModel
    }
}

export function characterFetchDataSuccess(data: CharacterResponseModel): actions.CharacterFetchDataSuccessAction {
    return {
        type: actions.CHARACTER_FETCH_DATA_SUCCESS,
        payload: data
    }
}

export function characterFetchDataFailure(error: Error | string): actions.CharacterFetchDataFailureAction {
    return {
        type: actions.CHARACTER_FETCH_DATA_FAILURE,
        payload: error
    }
}
/* #endregion Character */

/* #region House */
export function houseChangeFilter(filterModel: HouseFilterModel): actions.HouseChangeFilterAction {
    return {
        type: actions.HOUSE_CHANGE_FILTER,
        payload: filterModel
    }
}

export function houseFetchData(filterModel: HouseFilterModel): actions.HouseFetchDataAction {
    return {
        type: actions.HOUSE_FETCH_DATA,
        payload: filterModel
    }
}

export function houseFetchDataSuccess(data: HouseResponseModel): actions.HouseFetchDataSuccessAction {
    return {
        type: actions.HOUSE_FETCH_DATA_SUCCESS,
        payload: data
    }
}

export function houseFetchDataFailure(error: Error | string): actions.HouseFetchDataFailureAction {
    return {
        type: actions.HOUSE_FETCH_DATA_FAILURE,
        payload: error
    }
}
/* #endregion House */
