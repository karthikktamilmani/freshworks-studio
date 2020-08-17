import React, {Component} from "react";
import AddForm from "./AddForm/";
import List from "./List/";

export default class Home extends Component {
  render() {
    return (
      <main role="main" className="container-fluid pt-4">
        <header>
          <h2 className="text-center">Feed Management System</h2>
        </header>
        <div className="d-flex flex-column w-75 mx-auto">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                className="nav-link active"
                id="add-tab"
                data-toggle="tab"
                href="#add"
                role="tab"
                aria-controls="add"
                aria-selected="false"
                >
                New Entry
              </a>
              <a
                className="nav-link"
                id="list-tab"
                data-toggle="tab"
                href="#list"
                role="tab"
                aria-controls="list"
                aria-selected="true"
                >
                Feedings
              </a>
            </div>
          </nav>
          <div className="tab-content" id="v-pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="add"
              role="tabpanel"
              aria-labelledby="add-tab"
            >
              <AddForm></AddForm>
            </div>
            <div
              className="tab-pane fade"
              id="list"
              role="tabpanel"
              aria-labelledby="list-tab"
            >
              <List></List>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
