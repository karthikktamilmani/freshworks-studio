import Autosuggest from "react-autosuggest";
import React, {Component} from "react";

let existingValues = [];




const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => <div>{suggestion}</div>;

export default class AutoSuggestInput extends Component {
  constructor(props) {
    super(props);

    existingValues = props.defaultValues;
    this.placeholderValue = props.placeholderValue;
    this.name = props.name;
    this.id = props.id;
    this.required = props.required;


    this.state = {
      value: "",
      suggestions: [],
      existingValues: existingValues
    };
  }

  componentDidUpdate(nextProps) {
    const { defaultValues } = this.props
    if (nextProps.defaultValues !== defaultValues) {
     this.setState({ existingValues: defaultValues });
    }
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.state.existingValues.filter(
          existingValue =>
            existingValue.toLowerCase().slice(0, inputLength) === inputValue
        );
  }

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
  };


  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const {value, suggestions} = this.state;

    const inputProps = {
      placeholder: this.placeholderValue,
      value,
      onChange: this.onChange,
      name: this.name,
      id: this.id,
      required: this.required,
      className: "form-control"
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
