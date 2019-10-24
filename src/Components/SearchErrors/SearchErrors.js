import React, { Component } from "react";
import { Alert } from "antd";
import { withRedux } from "../../Redux";

export class SearchErrors extends Component {
  generateErrorMessage = () => {
    const { userFormCompletionStatus, locationFormCompletionStatus } = this.props;

    const userFormErrorArr = Object.keys(userFormCompletionStatus).map(key => userFormCompletionStatus[key]);
    const locationError = !locationFormCompletionStatus ? <li>Please Enter Location for search</li> : "";

    const nameError = this.formatFormError(userFormErrorArr, "name", "Please enter a name for the following user(s)");
    const queryError = this.formatFormError(userFormErrorArr, "query", "Please enter a search keyword for the following user(s)");
    const maxPriceError = this.formatFormError(userFormErrorArr, "maxPrice", "Please enter a MaxPrice for the following user(s)");
    const radiusError = this.formatFormError(userFormErrorArr, "radius", "Please enter a search Radius for the following user(s)");

    return (
      <ul>
        {locationError} {nameError} {queryError} {radiusError} {maxPriceError}
      </ul>
    );
  };

  formatFormError = (list, val, message) => {
    const errForVal = list.filter(user => !user[val]).map(user => user.identifier);
    if (errForVal.length > 0) {
      return <li>{`${message}: ${errForVal.join(", ")}`}</li>;
    } else {
      return "";
    }
  };

  render() {
    const { showErrorAlert, toggleErrorBox } = this.props;
    const errorMessage = this.generateErrorMessage();
    return (
      <div>
        {showErrorAlert && (
          <Alert
            message="Unable to Submit Form Please Update the Following fields:"
            description={errorMessage}
            type="error"
            closable
            afterClose={toggleErrorBox}
            showIcon
          />
        )}
      </div>
    );
  }
}

export default withRedux(SearchErrors);
