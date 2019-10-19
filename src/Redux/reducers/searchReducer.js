import * as TYPES from "../../Constants/types";

const InitialState = {
  formCompletionError: false,
  location: { error: null, data: null },
  places: { error: null, loading: false, data: [] }
};

const searchReducer = (state = InitialState, action) => {
  switch (action.type) {
    case TYPES.SELECT_LOCATION: {
      return { ...state, formCompletionError: false, location: { error: action.error, data: action.data } };
    }
    case TYPES.CLEAR_LOCATION: {
      return { ...state, location: InitialState.location };
    }
    case TYPES.FORM_COMPLETION_ERROR: {
      return { ...state, formCompletionError: true };
    }
    case TYPES.PLACES_SEARCH_COMPLETE: {
      return { ...state, places: { error: null, loading: false, data: action.data } };
    }
    case TYPES.PLACES_SEARCH_LOADING: {
      return { ...state, places: { ...state.places, loading: true } };
    }
    case TYPES.PLACES_SEARCH_ERROR: {
      return { ...state, places: { loading: false, data: [], error: action.error } };
    }
  }
  return state;
};

export default searchReducer;
