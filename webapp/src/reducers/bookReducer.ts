import * as actionTypes from "../actions/actionTypes";
import { BookFilterModel, BookResponseModel } from "../model";

export interface BookStateModel {
    BookFilter: BookFilterModel,
    BookData: BookResponseModel
}

const initialState: BookStateModel = {
    BookFilter: {
        page: 1,
        paseSize: 10,
        name: "",
        fromReleaseDate: "",
        toReleaseDate: ""
    },
    BookData: {
        ListBookData: []
    }
};

export default function bookReducer(
    state: BookStateModel = initialState,
    action: actionTypes.AppAction
): BookStateModel {
    switch (action.type) {
        case actionTypes.BOOK_CHANGE_FILTER:
            return {
                ...state,
                BookFilter: action.payload
            }
        case actionTypes.BOOK_FETCH_DATA_SUCCESS:
            return {
                ...state,
                BookData: action.payload
            }
        default:
            return state;
    }
}
