import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { connect } from "react-redux";
import * as actions from "../actions";
import config from "../../config/keys";
import image from "./marker.jpg";
import Geocode from "react-geocode";
Geocode.setApiKey(config.googleMap);

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPosition: { lat: 0, lng: 0 },
      city: {lat: 0, lng: 0},
    };
  }
  componentDidMount() {
    console.log(this.props.city)
    this.getCurrentPosition();
    this.GetCity()
  }

  componentDidUpdate(prevProps) {
    if (this.props.city !== prevProps.city) {
      this.GetCity(this.props.city)
    }
  }

  GetCity(){
    Geocode.fromAddress(this.props.city).then(
      response => {
        const lat = response.results[0].geometry.location.lat;
        const lng = response.results[0].geometry.location.lng;
        this.setState({city: {lat: lat, lng: lng}})
      },
      error => {
        console.error(error);
      }
    );
  }
  
  // My current position
  getCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        this.setState({ currentPosition: { lat: lat, lng: lng } });
      });
    }
  }

  // Display Marker
  displayMarkers = () => {
    if (this.props.vehicles.length > 0) {
      return this.props.vehicles.map(vehicle => {
        return (
          <Marker
            google={this.props.google}
            key={vehicle._id}
            animation={this.props.google.maps.Animation.DROP}
            position={{
              lat: vehicle.lat,
              lng: vehicle.lng
            }}
            icon={{
              url: image,
              anchor: new window.google.maps.Point(16, 16),
              scaledSize: new window.google.maps.Size(32, 32)
            }}
            onClick={() => this.props.action(vehicle._id)}
          />
        );
      });
    } else {
      return <div>Nothing Found...</div>;
    }
  };

  render() {
    const currentPosition = this.state.currentPosition;
    const city = this.state.city
    if (currentPosition.lat === 0 && currentPosition.lng === 0) {
      return (
        <div style={{ marginTop: "50%" }} className="center">
          <p>Loading...</p>
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (city.lat === 0 && city.lng === 0) {
      return (
        <div style={{ marginTop: "50%" }} className="center">
          <p>Loading...</p>
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    console.log(city.lat)
    console.log(city.lng)
      return (
      <div
          style={{
            position: "relative",
            height: "827px"
          }}
        >
          <Map
            google={this.props.google}
            zoom={12}
            initialCenter={{lat: city.lat,
              lng: city.lng }}
            center={{lat: city.lat,
              lng: city.lng }}
          >
            <Marker position={this.state.currentPosition} />
            {this.displayMarkers()}
          </Map>
      </div>
      );
    

  }
}

function mapStateToPros(state) {
  return {
    authenticated: state.auth.authenticated,
    vehicles: state.vehicles
  };
}
export default connect(
  mapStateToPros,
  actions
)(
  GoogleApiWrapper({
    apiKey: config.googleMap
  })(GoogleMap)
);
