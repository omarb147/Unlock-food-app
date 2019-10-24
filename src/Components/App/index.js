import React from "react";
import SearchForm from "../SearchForm";
import LocationSearch from "../LocationSearch";
import "antd/dist/antd.css";
import AppLayout from "../Layout";
import MainHeader from "../MainHeader";
import ResultsView from "../ResultsView";
import SearchErrors from "../SearchErrors";
import { withRedux } from "../../Redux";

const App = ({ selectedUser }) => {
  return (
    <AppLayout>
      <MainHeader />
      <div style={{ background: "#fff", padding: 24, minHeight: 280, zIndex: 0, position: "relative", overflow: "visible" }}>
        <SearchErrors />
        <SearchForm uid={selectedUser} key={selectedUser} />
        <ResultsView />
      </div>
    </AppLayout>
  );
};

export default withRedux(App);
