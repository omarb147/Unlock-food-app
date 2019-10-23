import React, { Component } from "react";
import withSearch from "../WithSearch";
import { Button } from "antd";

export class SearchFormButton extends Component {
  submitFormHandler = () => {
    const { toggleErrorBox, showErrorAlert, userFormCompletionStatus, locationFormCompletionStatus } = this.props;
    //Check For form errors
    const formComplete = this.checkFormCompletion();

    if (!formComplete) {
      //If errors -  Diplay all form errors in warning

      if (!showErrorAlert) toggleErrorBox();
    } else {
      //no warning so can format/ compute data and submit.
    }

    //If no warnings format search data (seperate function) + chose winner + submit data to search.
  };

  formatSearchData = () => {};

  checkFormCompletion = () => {
    const { userFormCompletionStatus, locationFormCompletionStatus } = this.props;
    const userFormIncomplete = Object.keys(userFormCompletionStatus)
      .map(key => userFormCompletionStatus[key].complete)
      .some(el => el === false);
    return !userFormIncomplete && locationFormCompletionStatus;
  };

  render() {
    return (
      <Button shape="round" icon="fire" type="danger" onClick={this.submitFormHandler}>
        Find Me Some food
      </Button>
    );
  }
}

export default withSearch(SearchFormButton);
