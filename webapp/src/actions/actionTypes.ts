import { BookFilterModel, BookResponseModel, UserInfoModel,
    CharacterFilterModel, CharacterResponseModel, HouseFilterModel, HouseResponseModel
} from "../model/index";

export const AUTH_SET_USER_INFO = "AUTH_SET_USER_INFO";
export interface AuthSetUserInfoAction {
    type: typeof AUTH_SET_USER_INFO,
    payload: UserInfoModel
}

/* region Book */
export const BOOK_CHANGE_FILTER = "BOOK_CHANGE_FILTER";
export const BOOK_FETCH_DATA = "BOOK_FETCH_DATA"
export const BOOK_FETCH_DATA_SUCCESS = "BOOK_FETCH_DATA_SUCCESS";
export const BOOK_FETCH_DATA_FAILURE = "BOOK_FETCH_DATA_FAILURE";

export interface BookChangeFilterAction {
    type: typeof BOOK_CHANGE_FILTER,
    payload: BookFilterModel
};
export interface BookFetchDataAction {
    type: typeof BOOK_FETCH_DATA,
    payload: BookFilterModel
}
export interface BookFetchDataSuccessAction {
    type: typeof BOOK_FETCH_DATA_SUCCESS;
    payload: BookResponseModel;
}
export interface BookFetchDataFailureAction {
    type: typeof BOOK_FETCH_DATA_FAILURE;
    payload: Error | string;
}
/* #endregion Book */


/* region Character */
export const CHARACTER_CHANGE_FILTER = "CHARACTER_CHANGE_FILTER";
export const CHARACTER_FETCH_DATA = "CHARACTER_FETCH_DATA"
export const CHARACTER_FETCH_DATA_SUCCESS = "CHARACTER_FETCH_DATA_SUCCESS";
export const CHARACTER_FETCH_DATA_FAILURE = "CHARACTER_FETCH_DATA_FAILURE";

export interface CharacterChangeFilterAction {
    type: typeof CHARACTER_CHANGE_FILTER,
    payload: CharacterFilterModel
};
export interface CharacterFetchDataAction {
    type: typeof CHARACTER_FETCH_DATA,
    payload: CharacterFilterModel
}
export interface CharacterFetchDataSuccessAction {
    type: typeof CHARACTER_FETCH_DATA_SUCCESS;
    payload: CharacterResponseModel;
}
export interface CharacterFetchDataFailureAction {
    type: typeof CHARACTER_FETCH_DATA_FAILURE;
    payload: Error | string;
}
/* #endregion Character */

/* region House */
export const HOUSE_CHANGE_FILTER = "HOUSE_CHANGE_FILTER";
export const HOUSE_FETCH_DATA = "HOUSE_FETCH_DATA"
export const HOUSE_FETCH_DATA_SUCCESS = "HOUSE_FETCH_DATA_SUCCESS";
export const HOUSE_FETCH_DATA_FAILURE = "HOUSE_FETCH_DATA_FAILURE";

export interface HouseChangeFilterAction {
    type: typeof HOUSE_CHANGE_FILTER,
    payload: HouseFilterModel
};
export interface HouseFetchDataAction {
    type: typeof HOUSE_FETCH_DATA,
    payload: HouseFilterModel
}
export interface HouseFetchDataSuccessAction {
    type: typeof HOUSE_FETCH_DATA_SUCCESS;
    payload: HouseResponseModel;
}
export interface HouseFetchDataFailureAction {
    type: typeof HOUSE_FETCH_DATA_FAILURE;
    payload: Error | string;
}
/* #endregion Character */

export type AppAction =
    | AuthSetUserInfoAction
    | BookChangeFilterAction
    | BookFetchDataAction
    | BookFetchDataSuccessAction
    | BookFetchDataFailureAction
    | CharacterChangeFilterAction
    | CharacterFetchDataAction
    | CharacterFetchDataSuccessAction
    | CharacterFetchDataFailureAction
    | HouseChangeFilterAction
    | HouseFetchDataAction
    | HouseFetchDataSuccessAction
    | HouseFetchDataFailureAction;



