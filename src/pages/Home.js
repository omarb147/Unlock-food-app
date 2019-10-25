import React from "react";
import SearchForm from "../Components/SearchForm";
import LocationSearch from "../Components/LocationSearch";
import "antd/dist/antd.css";
import AppLayout from "../Components/Layout";
import MainHeader from "../Components/MainHeader";
import ResultsView from "../Components/ResultsView";
import SearchErrors from "../Components/SearchErrors";
import { withRedux } from "../Redux";

const Home = ({ selectedUser }) => {
  return (
    <AppLayout>
      <MainHeader />
      <div style={{ background: "#fff", padding: 24, minHeight: 280, zIndex: 0, position: "relative", overflow: "visible" }}>
        <SearchErrors />
        <SearchForm uid={selectedUser} key={selectedUser} />
        {/* <ResultsView /> */}
      </div>
    </AppLayout>
  );
};

export default withRedux(Home);
