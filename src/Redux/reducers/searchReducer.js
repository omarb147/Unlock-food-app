import * as TYPES from "../../Constants/types";

const InitialState = {
  formCompletionStatus: false,
  location: { error: null, data: null },
  winner: { uid: null, location: null },
  places: { error: null, loading: false, data: {} },
  selectedPlace: null
};

const searchReducer = (state = InitialState, action) => {
  switch (action.type) {
    case TYPES.SELECT_LOCATION: {
      return { ...state, formCompletionStatus: true, location: { error: action.error, data: action.data } };
    }
    case TYPES.CLEAR_LOCATION: {
      return { ...state, location: InitialState.location, formCompletionStatus: false };
    }
    case TYPES.PLACES_SEARCH_COMPLETE: {
      return {
        ...state,
        places: { ...state.places, loading: false, data: { ...state.places.data, [action.uid]: { ...action.data } } }
      };
    }
    case TYPES.PLACES_SEARCH_LOADING: {
      return { ...state, places: { ...state.places, loading: true } };
    }
    case TYPES.PLACES_SEARCH_ERROR: {
      return { ...state, places: { loading: false, data: {}, error: action.error } };
    }
    case TYPES.PLACES_SEARCH_CLEAR_DATA: {
      return { ...state, places: { loading: false, data: {}, error: null } };
    }
    case TYPES.PLACES_SELECTED_PLACE: {
      return { ...state, selectedPlace: action.data };
    }
    case TYPES.SELECT_WINNER: {
      return { ...state, winner: { uid: action.uid, location: action.location } };
    }
  }
  return state;
};

export default searchReducer;
