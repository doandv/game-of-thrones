import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "../reducers";
import { rootSaga } from "../sagas";
const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return store;
  };
  
  export default configureStore;
  