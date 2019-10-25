import React from "react";
import { connect } from "react-redux";
import * as ACTIONS from "./actions";

const withRedux = Component => {
  class WithRedux extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithRedux);
};

const mapStateToProps = state => {
  return {
    locationFormCompletionStatus: state.search.formCompletionStatus,
    searchLocation: state.search.location,
    places: state.search.places,
    winner: state.search.winner,
    selectedPlace: state.search.selectedPlace,
    // users: state.userData.users,
    userFormData: state.userData.data,
    userFormCompletionStatus: state.userData.formCompletionStatus,
    selectedUser: state.userData.selectedUser,
    openNow: state.userData.openNow,
    showErrorAlert: state.UIState.showErrorAlert
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectLocation: locationData => dispatch(ACTIONS.selectLocation(locationData)),
    raiseFormCompletionError: () => dispatch(ACTIONS.raiseFormCompletionError()),
    clearLocation: () => dispatch(ACTIONS.clearLocation()),
    placesSearchComplete: (data, uid) => dispatch(ACTIONS.placesSearchComplete(data, uid)),
    placesSearchClearData: () => dispatch(ACTIONS.placesSearchClearData()),
    placesSearchLoading: () => dispatch(ACTIONS.placesSearchLoading()),
    placesSearchError: error => dispatch(ACTIONS.placesSearchError(error)),
    addFormUser: uid => dispatch(ACTIONS.addFormUser(uid)),
    editFormForUser: (uid, data) => dispatch(ACTIONS.editFormForUser(uid, data)),
    editNameForUser: (uid, name) => dispatch(ACTIONS.editNameForUser(uid, name)),
    selectUser: uid => dispatch(ACTIONS.selectUser(uid)),
    toggleOpenNow: () => dispatch(ACTIONS.toggleOpenNow()),
    removeFormUser: uid => dispatch(ACTIONS.removeFormUser(uid)),
    updateUserFormCompletionStatus: uid => dispatch(ACTIONS.updateUserFormCompletionStatus(uid)),
    toggleErrorBox: () => dispatch(ACTIONS.toggleErrorBox()),
    selectWinner: users => dispatch(ACTIONS.selectWinner(users)),
    selectPlace: data => dispatch(ACTIONS.selectPlace(data))
  };
};

export default withRedux;
