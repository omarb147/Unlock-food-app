import React, { Component } from "react";
import { PageHeader, Button, Icon } from "antd";

export class MainHeader extends Component {
  render() {
    return (
      <PageHeader
        title={
          <h1>
            <Icon type="unlock" />
            Unlock
          </h1>
        }
        subTitle={<h3>Where you can find local places to eat for everyone!</h3>}
      ></PageHeader>
    );
  }
}

export default MainHeader;
