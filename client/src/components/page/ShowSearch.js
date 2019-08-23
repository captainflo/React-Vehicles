import React from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions";
import GoogleMap from '../utils/GoogleMap';

class ShowSearch extends React.Component{
    state ={
        classCard: "card horizontal"
    }
    componentDidMount(){
        this.props.getAllVehicleByCity(this.props.match.params.city)
    }

    // This method will be sent to the child component
    handler=(vehicleId)=>{
        this.setState({classCard: `card horizontal`})
        if(vehicleId){
            this.setState({ classCard: { ...this.state.classCard, [vehicleId]: ` red` }})
            console.log(this.state.classCard)
        }
    }

    // Render Vehicles
    renderListVehicle=()=>{
        if(this.props.vehicles.length > 0){
            return this.props.vehicles.map(vehicle =>{
                return(
                    <div ref={vehicle._id} key={vehicle._id}  className={'card horizontal'+' '+ this.state.classCard[vehicle._id]}>
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
            <div class='container'>
                <h3>Search for {this.props.match.params.city}</h3>
                <div className='row'>
                    <div className='col m6 s12'>
                        {this.renderListVehicle()}
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