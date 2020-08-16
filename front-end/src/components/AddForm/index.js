import React, { Component } from "react";
import AutoSuggestInput from "../AutoSuggestionInput";

const dummyvalues = ["Denmark", "Canada", "People"];

export default class AddForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleRepeatSchedule = this.toggleRepeatSchedule.bind(this);
    this.state = {
      isRepeatable: false,
    };

    this.repeatOptions = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  }

  handleSubmit = (event) => {
    event.preventDefault();
  };

  toggleRepeatSchedule = (event) => {
    this.setState({
      isRepeatable: event.target.checked,
    });
  };

  render() {
    return (
      <div
        className="flex"
        style={{
          maxWidth: "calc(100vw - 50%)",
          marginLeft: "20%",
          alignItems: "center",
        }}
      >
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-3 mb-3">
              <label>Number of Ducks Fed</label>
              <input
                type="number"
                className="form-control"
                id="numberDucksFed"
                name="numberDucksFed"
                min="1"
                placeholder="1"
              />
            </div>
            <div className="col-md-3 mb-3">
              <label>Time Fed</label>
              <input
                type="time"
                className="form-control"
                id="timeFed"
                name="timeFed"
              />
            </div>
            <div className="col-md-3 mb-3">
              <label>Location where they are fed</label>
              <AutoSuggestInput
                defaultValues={dummyvalues}
                placeholderValue="Near Seaside"
                name="fedLocation"
                id="fedLocation"
              ></AutoSuggestInput>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3 mb-3">
              <label>What kind of foods were fed</label>
              <AutoSuggestInput
                defaultValues={dummyvalues}
                placeholderValue="Fruits"
                name="foodKind"
                id="foodKind"
              ></AutoSuggestInput>
            </div>
            <div className="col-md-3 mb-3">
              <label>What food were fed</label>

              <AutoSuggestInput
                defaultValues={dummyvalues}
                placeholderValue="Grapes"
                name="food"
                id="food"
              ></AutoSuggestInput>
            </div>
            <div className="col-md-3 mb-3">
              <label>How much food were fed</label>
              <input
                type="number"
                className="form-control"
                id="foodQuantity"
                name="foodQuantity"
                placeholder="1"
                min="1"
              />
            </div>
          </div>

          <div className="row">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="isRepeatable"
                onClick={this.toggleRepeatSchedule}
              />
              <label className="form-check-label">Repeat</label>
            </div>
            <div>
              <div style={this.state.isRepeatable ? {} : { display: "none" }}>
                {this.repeatOptions.map((item, index) => (
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="repeatSchedule"
                      id={index}
                    />
                    <label className="form-check-label" for={index}>
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            className="button button-medium button-green-outline"
            type="submit"
          >
            Continue to checkout
          </button>
        </form>
      </div>
    );
  }
}
