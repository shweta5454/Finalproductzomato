import React, { Component } from "react";
import "../styles/Wallpaper.css";
import banner from "../assets/homepageimg.png";
import { Link } from "react-router-dom";

export default class Wallpaper extends Component {
  constructor() {
    super();
    console.log("wallpaper constructor is being called");
    this.state = {
      locations: [],
      restaurants: [],
    };
  }

  componentDidMount() {
    console.log("wallpaper mounted");
    fetch("http://localhost:8080/edumato/locations", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ locations: data.data });
        // console.log(data.data)
      });
  }

  fetchRestaurents = (event) => {
    fetch(`http://localhost:8080/edumato/restaurants/${event.target.value}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        this.setState({restaurants : data.data});
      });
  };

  render() {
    let locationOption =
      this.state.locations.length &&
      this.state.locations.map((item) => (
        <option key={item.name} value={item.city_id}>
          {item.name}
        </option>
      ));

    let restaurantsList = this.state.restaurants.length && (
      <ul>
        {this.state.restaurants.map((item) => (
          <li key={item.name}><Link to={`edumato/restaurantDetails/${item.name}`}>{item.name}</Link></li>
        ))}
      </ul>
    );

    return (
      <div>
        <img src={banner} width="100%" height="450" alt="no imf found" />

        <div className="logo">
          <p>e!</p>
        </div>
        <div className="headings my-3">Find the best restaurants, cafes, bars</div>
        
        <div className="locationSelector " >
          <select className="locationDropdown " onChange={this.fetchRestaurents}>
            <option value="1">Select</option>
            {locationOption}
          </select>

        <div  className="mx-5 mx-sm-5 mx-m-5 notebooks">

          <input
            className="restaurantsinput"
            type="text"
            placeholder="Search Restaurant"
          />
            {restaurantsList}
        </div>
        </div>


      </div>
    );
  }
}
