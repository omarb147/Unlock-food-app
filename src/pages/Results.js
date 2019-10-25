import React, { Component } from "react";
import { PageHeader, Result, Icon } from "antd";
import { withRedux } from "../Redux";

export class Results extends Component {
  render() {
    const { winner, selectedPlace, userFormData } = this.props;
    const winnerData = userFormData[winner];
    console.log(selectedPlace);
    return (
      <div>
        <PageHeader
          onBack={() => console.log("back")}
          title={
            <h1>
              <Icon type="unlock" />
              Unlock
            </h1>
          }
          subTitle={<h3>Where you can find local places to eat for everyone!</h3>}
        ></PageHeader>
        <Result status="404" title={`${winnerData.name} is the Winner!`}></Result>
      </div>
    );
  }
}

export default withRedux(Results);
