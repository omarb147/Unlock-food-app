import React, { Component } from "react";
import { PageHeader, Descriptions, Icon, Checkbox, Button } from "antd";
import LocationSearchForm from "../LocationSearch";
import { withRedux } from "../../Redux";
import SearchFormButton from "../SearchFormButton";

export class MainHeader extends Component {
  render() {
    const { openNow, toggleOpenNow } = this.props;
    return (
      <div>
        <PageHeader
          title={
            <h1>
              <Icon type="unlock" />
              Unlock
            </h1>
          }
          subTitle={<h3>Where you can find local places to eat for everyone!</h3>}
          extra={<SearchFormButton />}
        ></PageHeader>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            zIndex: 10000,
            position: "relative",
            overflow: "visible",
            padding: 24
          }}
        >
          <div style={{ flex: "5", paddingRight: 10, zIndex: 100000, position: "relative", overflow: "visible" }}>
            <LocationSearchForm />
          </div>
          <div>
            <Checkbox checked={openNow} onChange={toggleOpenNow}>
              Open Now
            </Checkbox>
          </div>
        </div>
      </div>
    );
  }
}

export default withRedux(MainHeader);
