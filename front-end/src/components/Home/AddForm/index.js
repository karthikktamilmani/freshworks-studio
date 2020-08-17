import React, {Component} from "react";
import AutoSuggestInput from "../../Common/AutoSuggestionInput/";
import Days from "../../Constants/days";
import { saveFeed, getSuggestions } from "../../../store";
import Swal from 'sweetalert2';

export default class AddForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleRepeatSchedule = this.toggleRepeatSchedule.bind(this);
    this.repeatOptions = Days;
    this.state = {
      isRepeatable: false,
      isSaving: false,
      suggestions: {
        location: [],
        food: [],
        foodKind: []
      }
    };

    this.getSuggestions();
  };

  getSuggestions = () => {
    getSuggestions().then((result) => {
      this.setState({
        suggestions: {
          location: result.location,
          food: result.foodList,
          foodKind: result.foodKind
        }
      });
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const form = document.getElementById("add-form");
    form.classList.add('was-validated');

    if (form.checkValidity() === true) {
      this.setState({
        isSaving: true
      });

      let {
        numberDucksFed,
        timeFed,
        fedLocation,
        food,
        foodKind,
        foodQuantity,
        isRepeatable,
        repeatSchedule
      } = event.target;

      let repeatDays = [];

      if(isRepeatable.checked) {
        repeatSchedule.forEach((item, i) => {
          if(item.checked) {
            repeatDays.push(item.value)
          }
        });
      }

      const data = {
        "ducksQuantity": numberDucksFed.value,
        "time": timeFed.value,
        "location": fedLocation.value,
        "food": food.value,
        "foodKind": foodKind.value,
        "foodQuantity": foodQuantity.value,
        "repeat": repeatDays.join(",")
      };

       await saveFeed(data);
       this.setState({
         isSaving: false
       });
      this.reset(form);

       Swal.fire(
         'Success!',
         'The feed data has been saved.',
         'success'
       );
    }
  };

  reset = form => {
    form.classList.remove('was-validated');
    form.foodKind.value = "";
    form.foodQuantity.value = "";
    form.food.value = "";
    form.reset();
  }

  toggleRepeatSchedule = event => {
    this.setState({
      isRepeatable: event.target.checked
    });
  };

  render() {
    return (
      <div className="flex mt-4">
        <form className="needs-validation" id="add-form" onSubmit={this.handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="numberDucksFed">Number of Ducks Fed</label>
            <input
              type="number"
              className="form-control"
              id="numberDucksFed"
              min="1"
              placeholder="1"
              required
            />
          <div className="invalid-feedback">
            Please input a valid number.
          </div>
          </div>

          <div className="form-group position-relative">
            <label htmlFor="timeFed">Time Fed</label>
            <input
              type="time"
              className="form-control"
              id="timeFed"
              required
              name="timeFed"
            />
            <div className="invalid-feedback">
              Please select a time.
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="fedLocation">Location where they are fed</label>
            <AutoSuggestInput
              defaultValues={this.state.suggestions.location}
              placeholderValue="Near Seaside"
              name="fedLocation"
              required
              id="fedLocation"
            ></AutoSuggestInput>
          </div>

          <div className="form-group">
            <label htmlFor="food">What food were fed</label>

            <AutoSuggestInput
              defaultValues={this.state.suggestions.food}
              placeholderValue="Grapes"
              name="food"
              required
              id="food"
            ></AutoSuggestInput>
          </div>

          <div className="form-group">
            <label htmlFor="foodKind">What kind of food were fed</label>
            <AutoSuggestInput
              defaultValues={this.state.suggestions.foodKind}
              placeholderValue="Fruits"
              name="foodKind"
              required
              id="foodKind"
            ></AutoSuggestInput>
          </div>

          <div className="form-group">
            <label htmlFor="foodQuantity">How much food were fed</label>
            <input
              type="number"
              className="form-control"
              id="foodQuantity"
              name="foodQuantity"
              placeholder="1"
              min="1"
              required
            />
            <div className="invalid-feedback">
              Please input a valid quantity.
            </div>
          </div>

          <div className="form-group mb-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="isRepeatable"
                id="repeat"
                onClick={this.toggleRepeatSchedule}
              />
              <label className="form-check-label" htmlFor="repeat">
                Repeat
              </label>
            </div>
          </div>
          <div
            style={
              this.state.isRepeatable ? {display: "flex"} : {display: "none"}
            }
            className="align-items-start form-group"
          >
            {this.repeatOptions.map((item, index) => (
              <div key={index} className="repeat-option">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="repeatSchedule"
                  value={item.shortlabel}
                  id={item.shortlabel}
                />
                <label
                  className="form-check-label"
                  htmlFor={item.shortlabel}
                  aria-label={item.label}
                >
                  <span>{item.shortlabel}</span>
                </label>
              </div>
            ))}
          </div>

          <button
            className="btn btn-primary btn-lg btn-block mt-4"
            type="submit"
            disabled={this.state.isSaving}
            >
            <span>{this.state.isSaving ? 'Saving..' : 'Save'}</span>
          </button>
        </form>
      </div>
    );
  }
}
