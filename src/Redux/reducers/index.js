import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import userDataReducer from "./userDataReducer";

export default combineReducers({ search: searchReducer, userData: userDataReducer });
