import React from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions";
import GoogleMap from '../utils/GoogleMap';

class ShowSearch extends React.Component{
    state ={
        classCard: "card-product"
    }
    componentDidMount(){
        this.props.getAllVehicleByCity(this.props.match.params.city)
    }

    // This method will be sent to the child component
    handler=(vehicleId)=>{
        this.setState({classCard: `card-product`})
        if(vehicleId){
            this.setState({ classCard: { ...this.state.classCard, [vehicleId]: ` select-marker` }})
            console.log(this.state.classCard)
        }
    }

    // Render Vehicles
    renderListVehicle=()=>{
        if(this.props.vehicles.length > 0){
            return this.props.vehicles.map(vehicle =>{
                return(
                <div ref={vehicle._id} key={vehicle._id} id={'#'+vehicle.id} className={'card-product'+' '+ this.state.classCard[vehicle._id]}>
                    <img src={vehicle.image} alt='background'/>
                    <div class="card-product-infos">
                        <h2>{vehicle.name}</h2>
                        <p><i className="fas fa-building"></i> {vehicle.city}</p>
                        <p><i class="fas fa-dollar-sign"></i> {vehicle.price} /Half Day</p>
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
            <div className='search-show'>
                <div className='row'>
                    <div className='col m6 s12'>
                    <div className='list-vehicle'>
                        {this.renderListVehicle()} 
                    </div>
                    </div>
                    <div className='col m6 s12'>
                        <GoogleMap action={this.handler}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToPros(state) {
    return { 
        authenticated: state.auth.authenticated,
        vehicles: state.vehicles
    };
  }

export default connect(mapStateToPros, actions)(ShowSearch);