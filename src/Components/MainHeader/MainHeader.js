import React, { Component } from "react";
import { PageHeader, Descriptions, Icon, Checkbox, Button } from "antd";
import LocationSearchForm from "../LocationSearch";
import { withRedux } from "../../Redux";
import SearchFormButton from "../SearchFormButton";

export class MainHeader extends Component {
  render() {
    const { openNow, toggleOpenNow } = this.props;
    return (
      <PageHeader
        title={
          <h1>
            <Icon type="unlock" />
            Unlock
          </h1>
        }
        subTitle={<h3>Where you can find local places to eat for everyone!</h3>}
        extra={<SearchFormButton />}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ flex: "5", paddingRight: "10px" }}>
            <LocationSearchForm />
          </div>
          <div>
            <Checkbox checked={openNow} onChange={toggleOpenNow}>
              Open Now
            </Checkbox>
          </div>
        </div>
      </PageHeader>
    );
  }
}

export default withRedux(MainHeader);
