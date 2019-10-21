import React, { Component } from "react";
import { PageHeader, Descriptions, Icon, Checkbox } from "antd";
import LocationSearchForm from "../LocationSearch";

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
      >
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <LocationSearchForm />
          <Checkbox>Open Now</Checkbox>
        </div>
      </PageHeader>
    );
  }
}

export default MainHeader;
