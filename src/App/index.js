import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/Home";
import Results from "../pages/Results";
import * as ROUTES from "../Constants/routes";

const App = () => {
  return (
    <Router>
      <Route path={ROUTES.HOME} exact component={Home} />
      <Route path={ROUTES.RESULTS} component={Results} />
    </Router>
  );
};

export default App;
