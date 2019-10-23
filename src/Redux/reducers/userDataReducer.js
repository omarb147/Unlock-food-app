import * as TYPES from "../../Constants/types";

//Helper function to check if value exists
import { valExists } from "../../Helpers/ValExists";

const initialState = {
  // users: [1],
  data: { 1: { name: "User 1", query: "", radius: "1", maxPrice: "2" } },
  selectedUser: "1",
  openNow: true,
  formCompletionStatus: { 1: { identifier: "User 1", query: false, radius: true, maxPrice: true, name: true, complete: false } }
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ADD_FORM_USER: {
      let { uid } = action;
      const user_num = Object.keys(state.data).length;
      return {
        ...state,
        // users: [...state.users, uid],
        data: { ...state.data, [uid]: { name: `User ${user_num + 1}`, keyword: "", distance: "1", maxPrice: "2" } }
      };
    }
    case TYPES.EDIT_FORM_FOR_USER: {
      let { uid } = action;
      return { ...state, data: { ...state.data, [uid]: { ...action.data } } };
    }
    case TYPES.EDIT_NAME_FOR_USER: {
      let { uid } = action;
      return { ...state, selectedUser: uid, data: { ...state.data, 1: { name: action.name } } };
    }
    case TYPES.REMOVE_FORM_USER: {
      const selectedUser = state.selectedUser === action.uid ? 1 : state.selectedUser;
      const updatedData = state.data;
      delete updatedData[action.uid];
      return { ...state, selectedUser, data: { ...updatedData } };
    }
    case TYPES.SUBMIT_FORM:
      return state;

    case TYPES.SELECT_USER:
      return { ...state, selectedUser: action.uid };

    case TYPES.TOGGLE_OPEN_NOW:
      return { ...state, openNow: !state.openNow };

    case TYPES.UPDATE_USER_FORM_COMPLETION_STATUS: {
      const user = state.data[action.uid];
      const userIndex = Object.keys(state.data).findIndex(key => key == action.uid);
      //WORK NEEDED ON THIS IMPLEMENTATION
      const userCompletionStatus = {
        identifier: user.name || `User ${userIndex + 1}`,
        name: valExists(user.name),
        query: valExists(user.query),
        maxPrice: valExists(user.maxPrice),
        radius: valExists(user.radius),
        complete: valExists(user.name) && valExists(user.query) && valExists(user.maxPrice) && valExists(user.radius)
      };

      return { ...state, formCompletionStatus: { ...state.formCompletionStatus, [action.uid]: { ...userCompletionStatus } } };
    }
  }
  return state;
};

export default userDataReducer;
