import React from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions";
import API from '../utils/API';

class Feature extends React.Component{
    state = {
        vehicles: []
    }
    componentDidMount(){
        API.SearchVehicle(this.props.match.params.city)
            .then((data)=>{
                this.setState({vehicles: data.data})
            })
    }

    renderListVehicle=()=>{
        console.log(this.state.vehicles)
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
