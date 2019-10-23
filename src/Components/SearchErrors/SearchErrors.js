import React, { Component } from "react";
import { Alert } from "antd";
import { withRedux } from "../../Redux";

export class SearchErrors extends Component {
  render() {
    const { showErrorAlert, toggleErrorBox } = this.props;
    return (
      <div>
        {showErrorAlert && (
          <Alert
            message="Unable to Submit Form Please Update the Following fields:"
            description="This is an error message about copywriting."
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
