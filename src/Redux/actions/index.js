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

//FORM FUNCTIONS FOR USER
export const addFormUser = uid => {
  return { type: TYPES.ADD_FORM_USER, uid };
};
export const editFormForUser = (uid, data) => {
  return { type: TYPES.EDIT_FORM_FOR_USER, uid, data };
};

export const editNameForUser = (uid, name) => {
  return { type: TYPES.EDIT_NAME_FOR_USER, uid, name };
};

export const submitForm = () => {
  return { type: TYPES.SUBMIT_FORM };
};

export const selectUser = uid => {
  return { type: TYPES.SELECT_USER, uid };
};
