import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";

class UserShow extends React.Component {
  UNSAFE_componentWillMount(){
    this.props.fetchUser();
    this.props.getVehicleByUser(this.props.match.params.id);
  }

  renderListVehicle=()=>{
    if(this.props.vehicles.length > 0){
      return this.props.vehicles.map(vehicle =>{
        return(
          <div key={vehicle._id} class="card-product">
            <img src={vehicle.image} alt='background'/>
            <div class="card-product-infos">
              <h2>{vehicle.name}</h2>
              <p><i className="fas fa-building"></i> {vehicle.city}</p>
              <p><i class="fas fa-dollar-sign"></i> {vehicle.price} /Half Day</p>
            </div>
          </div>
        )
      })
    } 
  }
  
  render() { 
  
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <div className="card">
              <div className="top-left">
                <img
                  className="avatar-card z-depth-5"
                  src={
                    this.props.authenticated.avatar ||
                    process.env.PUBLIC_URL + "/images/background.jpg" || null
                  }
                  alt="background"
                />
              </div>
              <div className="card-image">
                <img
                  src={process.env.PUBLIC_URL + "/images/water.jpg"}
                  alt="background"
                />
                <span className="card-title">
                  {this.props.authenticated.firstName}{" "}
                  {this.props.authenticated.lastName}
                </span>

                <Link to={`/user/edit/${this.props.authenticated._id}`} className="btn-floating halfway-fab waves-effect waves-light red">
                  <i className="material-icons">edit</i>
                </Link>
              </div>
              <div className="card-content">
              <span className="card-title grey-text text-darken-4">
                  Details
                </span>
                <p><i className="far fa-envelope"></i> {this.props.authenticated.email}</p>
                <p><i className="fas fa-phone-square"></i> {this.props.authenticated.phone}</p>
                <hr></hr>
                <span className="card-title grey-text text-darken-4">
                  Your rent vehicle(s)
                </span>
                {this.renderListVehicle()}
                <p>Rent Your vehicle <Link className='btn-floating  waves-effect waves-light red' to={`/user/${this.props.authenticated_id}/createVehicle`}><i className="material-icons">add</i></Link></p>
              </div>
            </div>
          </div>
          <div className="col s12 m6">
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src={process.env.PUBLIC_URL + "/images/water.jpg"} alt='background'/>
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">Reservation<i class="material-icons right">more_vert</i></span>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Historic<i class="material-icons right">close</i></span>
                
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToPros, actions)(UserShow);


