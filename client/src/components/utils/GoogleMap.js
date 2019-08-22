import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Geocode from "react-geocode";


Geocode.setApiKey("AIzaSyCeAipRGvfEcH30zU8l2XMdvrtycHpV55g");

class GoogleMap extends React.Component {
    state = {
      location: { lat: 0, lng: 0 },
      zoom: 8
    };

  componentDidMount() {
    // Get My current position
    navigator.geolocation.getCurrentPosition(
      position => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        console.log("getCurrentPosition Success " + lat + lng); // logs position correctly
        this.setState({
          location: {
            lat: lat,
            lng: lng
          }
        });
      },
      error => {
        this.props.displayError("Error dectecting your location");
        console.error(JSON.stringify(error));
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }



  render() {
    const location = this.state.location;
    // if current position is null
    if (location.lat === 0 && location.lng === 0) {
      return (
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
      );
    }
    return (
      <Map
        google={this.props.google}
        zoom={this.state.zoom}
        initialCenter={{lat: 0, lng: 0}}
      >
        <Marker
          position={location}
          label={{
            text: "here"
          }}
        />
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCeAipRGvfEcH30zU8l2XMdvrtycHpV55g"
})(GoogleMap);
