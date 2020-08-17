import React, {Component} from "react";
import { fetchFeeds } from "../../../store";

export default class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      feeds:[]
    };

    this.fetchFeeds();
  }

  fetchFeeds = () => {
    fetchFeeds().then((result) => {
      this.setState({
        feeds: result,
      });
    });
  };


  render() {
    return (
      <div className="flex mt-4">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">No. of Ducks</th>
              <th scope="col">Time</th>
              <th scope="col">Location</th>
              <th scope="col">Food</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            {this.state.feeds.map((feed,index) => (
              <tr key={index}>
                <th scope="row">{index + 1 }</th>
                <td>{feed.NUMBER_OF_DUCKS}</td>
                <td>{feed.TIME}</td>
                <td>{feed.Location.LOCATION}</td>
                <td>{feed.Food.FOOD}</td>
                <td>{feed.FoodKind.FOOD_KIND}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
