import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import M from "materialize-css/dist/js/materialize.min.js";

class UserShow extends React.Component {
  state = {
    userReservation: [],
    displayProfile: true,
    displayVehicle: false,
    displayReservation: false,
  };

  componentDidMount() {
    this.props.fetchUser();
    this.props.getVehicleByUser(this.props.match.params.id);
    this.props.getReservationByUser(this.props.match.params.id);
    this.props.getReservationMyVehicle(this.props.match.params.id);
  }

  componentDidUpdate() {
    // collapsible
    const elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems, {
      inDuration: 300
    });
  }

  renderListVehicle = () => {
    if (this.props.vehicles.length > 0) {
      return this.props.vehicles.map(vehicle => {
        return (
          <li key={vehicle._id}>
            <div className="collapsible-header slideLeft">
            <div className="list-vehicle-user-show">
                <img src={vehicle.image} alt="background" />
                <div className="list-vehicle-user-show-content">
                  <h4>{vehicle.name}</h4>
                  <p>
                    <i className="fas fa-building"></i> {vehicle.city}
                  </p>
                  <p>
                    <i className="fas fa-dollar-sign"></i> {vehicle.price} /Half
                    Day
                  </p>
                </div>
              </div>
            </div>
            <div className="collapsible-body">
              <h5>Reservation</h5>
              {this.renderListOfMyVehicleReservation()}
            </div>
          </li>
        );
      });
    }
  };

  renderListOfMyVehicleReservation = () => {
    if (this.props.reservationsOfMyVehicles.length > 0) {
      return this.props.reservationsOfMyVehicles.map(
        reservationsOfMyVehicle => {
          return (
            <div key={reservationsOfMyVehicle._id} style={{ marginBottom: "20px" }}>
              <Link
                to={`/user/info/${reservationsOfMyVehicle.userCustomerId}`}
              >
                <div className="list-vehicle-reservation-user-show">
                  <img
                    className="avatar-large"
                    src={reservationsOfMyVehicle.imageCustomer}
                    alt="avatar"
                  />
                  <div className="list-vehicle-reservation-content-user-show">
                    <h5>
                      {reservationsOfMyVehicle.fistNameCustomer}{" "}
                      {reservationsOfMyVehicle.lastNameCustomer}{" "}
                    </h5>
                    <div className="list-vehicle-reservation-content-info-user-show">
                      <p>
                        <i className="fas fa-users"></i>{" "}
                        {reservationsOfMyVehicle.person}
                      </p>
                      <p>
                        <i className="fas fa-calendar-week"></i>{" "}
                        {reservationsOfMyVehicle.startDate}{" "}
                        To{" "}
                        <i className="fas fa-calendar-week"></i>{" "}
                        {reservationsOfMyVehicle.endDate}
                      </p>
                      <p>
                        <i className="fas fa-dollar-sign"></i>{" "}
                        {reservationsOfMyVehicle.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        }
      );
    }
  };

  renderListReservation = () => {
    if (this.props.reservations.length > 0) {
      return this.props.reservations.map(reservation => {
        return (
          <Link to={`/vehicle/${reservation.vehicleId}`} key={reservation._id} className="box-vehicle-user-show slideLeft">
            <img src={reservation.image} alt="background" />
            <div className="box-vehicle-content">
                <h5>{reservation.name}</h5>
                <p>
                  <i className="fas fa-users"></i> {reservation.person}
                </p>
                <p>
                  <i className="fas fa-calendar-week"></i>{" "}
                  {reservation.startDate}{" "}To{" "}<i className="fas fa-calendar-week"></i> {reservation.endDate}
                </p>
                <p>
                  <i className="fas fa-dollar-sign"></i> {reservation.price}
                </p>
            </div>
          </Link>
        );
      });
    }
  };

  infoProfile=()=>{
    return (
      <div className='info-user-user-show slideLeft'> 
        <div className='info-name-user-show'>
          {this.props.authenticated.firstName}{" "}{this.props.authenticated.lastName}{" "}
          <Link
            to={`/user/edit/${this.props.authenticated._id}`}
            className="btn-floating waves-effect waves-light btn-color"
          >
          <i className="material-icons">edit</i>
          </Link>
        </div>
          <p>
            <i className="far fa-envelope"></i>{" "}
            {this.props.authenticated.email}
          </p>
          <p>
            <i className="fas fa-phone-square"></i>{" "}
            {this.props.authenticated.phone || '-'}
          </p>
      </div>
    )
  }

  toggleInfoProfile=()=>{
    this.setState({displayProfile: true, displayVehicle: false, displayReservation: false});
  }
  toggleInfoVehicle=()=>{
    this.setState({displayVehicle: true, displayProfile: false ,displayReservation: false});
  }
  toggleInfoReservation=()=>{
    this.setState({displayReservation: true, displayProfile: false, displayVehicle: false});
  }
  
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m3">
            <div className="box-profile">
              <div style={{marginBottom: '30px'}} className="center">
                <img className="avatar-card z-depth-5" src={this.props.authenticated.avatar || process.env.PUBLIC_URL + "/images/background.jpg" || null } alt="background"/>
              </div>
              <ul className='list-select-user-show'>
                <p onClick={this.toggleInfoProfile}>My Profile</p>
                <p onClick={this.toggleInfoReservation}>Your Reservation</p>
                <p onClick={this.toggleInfoVehicle}>Your Vehicle</p>
              </ul>
            </div>
          </div>
          <div className="col s12 m9">
            <div className='info-selected-user-show'>
              {this.state.displayProfile && this.infoProfile()}
              {this.state.displayVehicle && 
                <div className='collaps-vehicle'><ul className="collapsible">{this.renderListVehicle()}</ul>
                  <p style={{color: '#f4f4f4'}} className="right rent-vehicle">
                    Rent Your vehicle{" "}
                    <Link
                      className="btn-floating  waves-effect waves-light btn-color"
                      to={`/user/${this.props.authenticated_id}/createVehicle`}
                    >
                      <i className="material-icons">add</i>
                    </Link>
                  </p>
              </div>} 
              {this.state.displayReservation && this.renderListReservation()}
            </div>
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
    vehicles: state.vehicles,
    reservations: state.reservation.reservation,
    reservationsOfMyVehicles: state.reservation.reservationOfMyVehicle
  };
}

export default connect(
  mapStateToPros,
  actions
)(UserShow);
