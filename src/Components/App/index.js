import React from "react";
import SearchForm from "../SearchForm";
import LocationSearch from "../LocationSearch";
import "antd/dist/antd.css";
import AppLayout from "../Layout";
import MainHeader from "../MainHeader";
import ResultsView from "../ResultsView";

const App = () => {
  return (
    <AppLayout>
      <MainHeader />
      <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
        <LocationSearch />
        <SearchForm />
        <ResultsView />
      </div>
    </AppLayout>
  );
};

export default App;
