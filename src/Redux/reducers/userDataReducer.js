import * as TYPES from "../../Constants/types";

const initialState = { users: [1], data: { 1: { name: "User 1", query: "", radius: "1", maxPrice: "2" } }, selectedUser: "1" };

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ADD_FORM_USER: {
      let { uid } = action;
      const user_num = state.users.length;
      return {
        ...state,
        users: [...state.users, uid],
        data: { ...state.data, [uid]: { name: `User ${user_num + 1}`, keyword: "", distance: "1", maxPrice: "2" } }
      };
    }
    case TYPES.EDIT_FORM_FOR_USER: {
      let { uid } = action;
      return { ...state, data: { ...state.data, [uid]: { ...action.data } } };
    }
    case TYPES.EDIT_NAME_FOR_USER: {
      let { uid } = action;
      return { ...state, selectedUser: uid, data: { ...state.data, 12: { name: action.name } } };
    }
    case TYPES.SUBMIT_FORM:
      return state;

    case TYPES.SELECT_USER:
      return { ...state, selectedUser: action.uid };
  }
  return state;
};

export default userDataReducer;
