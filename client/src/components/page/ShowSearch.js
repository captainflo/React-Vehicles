import React from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions";
import GoogleMap from '../utils/GoogleMap';


class ShowSearch extends React.Component{
    componentDidMount(){
        this.props.getAllVehicleByCity(this.props.match.params.city)
            // .then((data)=>{
            //     this.setState({vehicles: data.data})
            // })
    }

    renderListVehicle=()=>{
        if(this.props.vehicles.length > 0){
            return this.props.vehicles.map(vehicle =>{
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
                        <GoogleMap/>
                    </div>
                </div>
                
            </div>
        )
    }
}

function mapStateToPros(state) {
    console.log(state)
    return { 
        authenticated: state.auth.authenticated,
        vehicles: state.vehicles
    };
  }

export default connect(mapStateToPros, actions)(ShowSearch);

