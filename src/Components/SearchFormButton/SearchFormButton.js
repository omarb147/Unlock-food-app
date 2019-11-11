import React, { Component } from "react";
import withSearch from "../WithSearch";
import { Button } from "antd";
import { selectRandomIndexFromList } from "../../Helpers/RandomSelect";

export class SearchFormButton extends Component {
  submitFormHandler = () => {
    const { toggleErrorBox, showErrorAlert, searchLocation, userFormData, initiateAPISearch } = this.props;
    //Check For form errors
    const formComplete = this.checkFormCompletion();

    if (!formComplete) {
      //If errors -  Diplay all form errors in warning
      if (!showErrorAlert) toggleErrorBox();
    } else {
      //no warning so can format/ compute data and submit.
      //1. getData (see above)
      //2. decide winner
      const winnerId = this.selectWinner(userFormData);

      //3. format Data for search
      const searchData = this.formatSearchData(winnerId, userFormData, searchLocation);
      //4. initate search
      initiateAPISearch(searchData);

      //5. segue to new page to present winner.
    }

    //If no warnings format search data (seperate function) + chose winner + submit data to search.
  };

  selectWinner = users => {
    const userList = Object.keys(users);
    const winnerIndex = selectRandomIndexFromList(userList);
    const winner = userList[winnerIndex];
    this.props.selectWinner(winner, null);
    return winner;
  };

  formatSearchData = (winnerId, users, location) => {
    const { openNow } = this.props;
    const winner = users[winnerId];
    const formattedSearchQuery = Object.keys(users).map(key => {
      return { ...users[key], radius: winner.radius, maxPrice: winner.maxPrice - 1, latlng: location.data.latlng, openNow, uid: key };
    });
    return formattedSearchQuery;
  };

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
