import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import userDataReducer from "./userDataReducer";
import UIStateReducer from "./UIStateReducer";

export default combineReducers({ search: searchReducer, userData: userDataReducer, UIState: UIStateReducer });
