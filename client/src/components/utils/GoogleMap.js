import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { connect } from 'react-redux';
import * as actions from "../actions";
import config from '../../config/keys';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);

  this.state = {
    currentPosition: {lat: 0, lng:0},
  }
}
  componentDidMount(){
    this.getCurrentPosition();
  }
  
  // My current position
  getCurrentPosition(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        this.setState({currentPosition: {lat: lat,lng: lng}});
      })
    }  
  }

  // Display Marker
  displayMarkers = () => {
    console.log(this.props.vehicles)
    // return this.props.vehicles.map((vehicle, index) => {
    //   return <Marker key={index} id={index} position={{
    //    lat: store.latitude,
    //    lng: store.longitude
    //  }}
    //  onClick={() => console.log("You clicked me!")} />
    // })
  }

  render() {
    const currentPosition = this.state.currentPosition;
    // if current position is null
    if (currentPosition.lat === 0 && currentPosition.lng === 0) {
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
          zoom={8}
          initialCenter={this.state.currentPosition}
        >
        <Marker position={this.state.currentPosition} />
        {/* {this.displayMarkers()} */}
        </Map>
    );
  }
}

function mapStateToPros(state) {
  return { 
      authenticated: state.auth.authenticated,
      vehicles: state.vehicles
  };
}
export default connect(mapStateToPros, actions)(GoogleApiWrapper({
  apiKey: config.googleMap
})(GoogleMap));