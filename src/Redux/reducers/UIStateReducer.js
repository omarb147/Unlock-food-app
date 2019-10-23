import * as TYPES from "../../Constants/types";

const initalState = { showErrorAlert: false };

const UIStateReducer = (state = initalState, action) => {
  switch (action.type) {
    case TYPES.TOGGLE_ERROR_BOX: {
      return { ...state, showErrorAlert: !state.showErrorAlert };
    }
  }
  return state;
};

export default UIStateReducer;
