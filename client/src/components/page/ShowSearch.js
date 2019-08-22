import React from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions";
import API from '../utils/API';
import GoogleMap from '../utils/GoogleMap';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyCeAipRGvfEcH30zU8l2XMdvrtycHpV55g");

class Feature extends React.Component{
    state = {
        vehicles: [],
        stores: [],
    }
    componentDidMount(){
        API.SearchVehicle(this.props.match.params.city)
        .then((data)=>{
            this.setState({vehicles: data.data});
            this.getLatLngByAddress();
        })
     
    }

    getLatLngByAddress = () => {
        if (this.state.vehicles) {
          let liststore = [];
          for (let i = 0; i < this.state.vehicles.length; i++) {
            let city = this.state.vehicles[i].city;
            Geocode.fromAddress(city).then(
              response => {
                const lat = response.results[0].geometry.location.lat;
                const lng = response.results[0].geometry.location.lng;
                const storeLatLng = {
                  lat: lat,
                  lng: lng
                };
                liststore.push(storeLatLng);
              },
              error => {
                console.error(error);
              }
            );
          }
          this.setState({ stores: liststore });
          console.log( "I am inside getLatLngByAddress", this.state.stores) 
        }
      };
    
    renderListVehicle=()=>{
        if(this.state.vehicles.length > 0){
            return this.state.vehicles.map(vehicle =>{
                return(
                    <div key={vehicle._id} className="card horizontal">
                    <div className="card-image">
                    <img src={vehicle.image} alt={vehicle._id}/>
                    </div>
                    <div className="card-stacked">
                    <div className="card-content">
                        <p>{vehicle.name}</p>
                        <p>{vehicle.city}</p>
                    </div>
                    </div>
                </div>
                )
            })
        } else{
            return <div>Nothing found!</div>
        }
    }
    render(){
        return(
            <div>
                <h3>Search for {this.props.match.params.city}</h3>
                <div className='row'>
                    <div className='col m6 s12'>
                        {this.renderListVehicle()}
                    </div>
                    <div className='col m6 s12'>
                        <div>
                        <GoogleMap vehicles={this.state.vehicles} stores={this.state.stores}/>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

function mapStateToPros(state) {
    return { authenticated: state.auth.authenticated};
  }

export default connect(mapStateToPros, actions)(Feature);
