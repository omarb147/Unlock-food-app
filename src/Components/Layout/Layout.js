import React, { Component } from "react";
import { Layout } from "antd";

const { Content } = Layout;

export class AppLayout extends Component {
  render() {
    return (
      <Layout>
        <Content>{this.props.children}</Content>
      </Layout>
    );
  }
}

export default AppLayout;
