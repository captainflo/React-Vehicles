import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import GoogleMap from "../utils/GoogleMap";
import { Link } from "react-router-dom";
import SearchType from "../utils/SearchType";
import M from "materialize-css/dist/js/materialize.min.js";
import * as geolib from "geolib";
import Geocode from "react-geocode";
import config from "../../config/keys";
Geocode.setApiKey(config.googleMap);

class ShowSearch extends React.Component {
  state = {
    classCard: "card-product",
    city: { lat: "", lng: "" }
  };
  componentDidMount() {
    this.props.getAllVehicleByCity(this.props.match.params.city);
    // collapsible
    const elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems, {
      inDuration: 300
    });
    this.GetCity(this.props.match.params.city);
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.city !== prevProps.match.params.city) {
      this.props.getAllVehicleByCity(this.props.match.params.city);
      this.renderMap(this.props.match.params.city);
      this.GetCity(this.props.match.params.city);
    }
  }

  renderMap = city => {
    return <GoogleMap action={this.handler} city={city} />;
  };

  // This method will be sent to the child component
  handler = vehicleId => {
    window.location = "#" + vehicleId;
    this.setState({ classCard: `card-product` });
    if (vehicleId) {
      this.setState({
        classCard: { ...this.state.classCard, [vehicleId]: ` select-marker` }
      });
    }
  };

  // Convert city
  GetCity(city) {
    Geocode.fromAddress(city).then(
      response => {
        const lat = response.results[0].geometry.location.lat;
        const lng = response.results[0].geometry.location.lng;
        this.setState({ city: { lat: lat, lng: lng } });
      },
      error => {
        console.error(error);
      }
    );
  }

  // Get distance between my search and vehicle around
  getDistance = (vehicleLat, vehicleLng, array) => {
    const distance = geolib.getDistance(
      { latitude: this.state.city.lat, longitude: this.state.city.lng },
      { latitude: vehicleLat, longitude: vehicleLng }
    );
    const finalDistance = String(distance);
    const distanceInMile = geolib.convertDistance(finalDistance, "mi");
    const distanceWithTwoDecimal = distanceInMile.toFixed(2)
    array.push(distanceWithTwoDecimal);
  };

  // Render Vehicles
  renderListVehicle = () => {
    if (this.props.vehicles.length > 0) {
      return this.props.vehicles.map(vehicle => {
        const DistanceFromMySearch = [];
        const latVehicle = vehicle.lat;
        const lngVehicle = vehicle.lng;
        this.getDistance(latVehicle, lngVehicle, DistanceFromMySearch);
        if (vehicle.city === this.props.match.params.city) {
          return (
            <Link key={vehicle._id} to={"/vehicle/" + vehicle._id}>
              <div
                ref={vehicle._id}
                id={vehicle._id}
                className={
                  "card-product" + " " + this.state.classCard[vehicle._id]
                }
              >
                <img src={vehicle.image} alt="background" />
                <div className="card-product-infos">
                  <h2>{vehicle.name}</h2>
                  <p>
                    <i className="fas fa-building"></i> {vehicle.city}
                  </p>
                  <p>
                    <i className="fas fa-dollar-sign"></i> {vehicle.price} /Half
                    Day
                  </p>
                  <p>Your are {DistanceFromMySearch} Miles from {this.props.match.params.city}</p>
                </div>
              </div>
            </Link>
          );
        }
      });
    } else {
      return <div>Nothing found!</div>;
    }
  };

  // Render other Vehicles
  renderAroundListVehicle = () => {
    if (this.props.vehicles.length > 0) {
      return this.props.vehicles.map(vehicle => {
        const DistanceFromMySearch = [];
        const latVehicle = vehicle.lat;
        const lngVehicle = vehicle.lng;
        this.getDistance(latVehicle, lngVehicle, DistanceFromMySearch);
        if (DistanceFromMySearch < 30) {
          if (vehicle.city !== this.props.match.params.city) {
            return (
              <Link key={vehicle._id} to={"/vehicle/" + vehicle._id}>
                <div
                  ref={vehicle._id}
                  id={vehicle._id}
                  className={
                    "card-product" + " " + this.state.classCard[vehicle._id]
                  }
                >
                  <img src={vehicle.image} alt="background" />
                  <div className="card-product-infos">
                    <h2>{vehicle.name}</h2>
                    <p>
                      <i className="fas fa-building"></i> {vehicle.city}
                    </p>
                    <p>
                      <i className="fas fa-dollar-sign"></i> {vehicle.price}{" "}
                      /Half Day
                    </p>
                    <p>Your are {DistanceFromMySearch} Miles from {this.props.match.params.city}</p>
                  </div>
                </div>
              </Link>
            );
          }
        }
      });
    } else {
      return <div>Nothing found!</div>;
    }
  };

  render() {
    return (
      <div className="search-show">
        <div className="row">
          <div className="col m6 s12 search-filter">
            <ul className="collapsible">
              <li>
                <div className="collapsible-header">
                  Search{" "}
                  <i style={{ fontSize: "20px" }} className="material-icons">
                    search
                  </i>
                </div>
                <div className="collapsible-body">
                  {" "}
                  <SearchType />
                </div>
              </li>
            </ul>
            <div className="list-vehicle">
              {this.renderListVehicle()}
              <h5 style={{paddingLeft: '10px'}}>Around {this.props.match.params.city} (30 Miles)</h5>
              {this.renderAroundListVehicle()}
            </div>
          </div>
          <div className="col m6 s12">
            {this.renderMap(this.props.match.params.city)}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToPros(state) {
  console.log(state);
  return {
    authenticated: state.auth.authenticated,
    vehicles: state.vehicles
  };
}

export default connect(
  mapStateToPros,
  actions
)(ShowSearch);
