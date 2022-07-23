import { type } from "os";
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import bookReducer from "./bookReducer";
import characterReducer from "./characterReducer";
import houseReducer from "./houseReducer";

const rootReducer = combineReducers({
    authReducer,
    bookReducer,
    characterReducer,
    houseReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;