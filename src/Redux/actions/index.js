import * as TYPES from "../../Constants/types";

export const selectLocation = (data, error = null) => {
  return { type: TYPES.SELECT_LOCATION, data, error };
};

export const raiseFormCompletionError = () => {
  return { type: TYPES.FORM_COMPLETION_ERROR };
};

export const clearLocation = () => {
  return { type: TYPES.CLEAR_LOCATION };
};

export const placesSearchLoading = () => {
  return { type: TYPES.PLACES_SEARCH_LOADING };
};

export const placesSearchComplete = data => {
  return { type: TYPES.PLACES_SEARCH_COMPLETE, data };
};

export const placesSearchError = error => {
  return { type: TYPES.PLACES_SEARCH_ERROR };
};
