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
  return { formCompletionError: state.search.formCompletionError, location: state.search.location, places: state.search.places };
};

const mapDispatchToProps = dispatch => {
  return {
    selectLocation: locationData => dispatch(ACTIONS.selectLocation(locationData)),
    raiseFormCompletionError: () => dispatch(ACTIONS.raiseFormCompletionError()),
    clearLocation: () => dispatch(ACTIONS.clearLocation()),
    placesSearchComplete: data => dispatch(ACTIONS.placesSearchComplete(data)),
    placesSearchLoading: () => dispatch(ACTIONS.placesSearchLoading()),
    placesSearchError: error => dispatch(ACTIONS.placesSearchError(error))
  };
};

export default withRedux;
