import React, { Component } from "react";
import { Layout } from "antd";
import Siderbar from "../Sidebar/Siderbar";

const { Content } = Layout;

export class AppLayout extends Component {
  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Layout>
          <Siderbar />
          <Content>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;
