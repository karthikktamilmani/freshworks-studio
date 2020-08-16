import React from "react";
import { Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// import "popper.js/dist/popper.min.js";
import "jquery/dist/jquery.slim.min.js";
import "jquery/dist/jquery.min.js";
import "./App.scss";
import AddForm from "./components/AddForm";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={AddForm} />
      </Switch>
    </>
  );
}

export default App;
