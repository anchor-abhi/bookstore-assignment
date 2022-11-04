import { legacy_createStore, combineReducers } from "redux";
import { authReducer } from "./authreducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = legacy_createStore(rootReducer);
