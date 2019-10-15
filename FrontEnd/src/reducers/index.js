//Đây là file reducer tổng hợp để điều hướng các reducers có trong app
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import homeReducer from "./homeReducer";

const rootReducer = combineReducers({
  authReducer,
  homeReducer
});

export default rootReducer;
