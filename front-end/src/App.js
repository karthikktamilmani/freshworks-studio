import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// import "popper.js/dist/popper.min.js";
import "jquery/dist/jquery.slim.min.js";
import "jquery/dist/jquery.min.js";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
