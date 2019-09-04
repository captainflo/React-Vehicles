import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import M from "materialize-css/dist/js/materialize.min.js";

class UserShow extends React.Component {
  state = {
    userReservation: []
  }
  componentDidMount(){
    // Sidebar
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {
      inDuration: 300
    });
  }

  componentWillMount() {
    this.props.fetchUser();
    this.props.getVehicleByUser(this.props.match.params.id);
    this.props.getReservationByUser(this.props.match.params.id);
    this.props.getReservationMyVehicle(this.props.match.params.id);
  }

  renderListVehicle = () => {
    if (this.props.vehicles.length > 0) {
      return this.props.vehicles.map(vehicle => {
        return (
        <li key={vehicle._id}>
          <div className="collapsible-header">
            <div className="card-vehicle">
              <img src={vehicle.image} alt="background" />
              <div className="card-vehicle-content">
                <h2>{vehicle.name}</h2>
                <p><i className="fas fa-building"></i> {vehicle.city}</p>
                <p><i className="fas fa-dollar-sign"></i> {vehicle.price} /Half Day</p>
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
      return this.props.reservationsOfMyVehicles.map(reservationsOfMyVehicle => {
        return (
        <div style={{marginBottom: 20}} key={reservationsOfMyVehicle._id}>
            <div className="card-vehicle">
              <img className='avatar' src={reservationsOfMyVehicle.imageCustomer} alt='avatar'/>
              <div className="card-vehicle-content">
                
              <p>{reservationsOfMyVehicle.fistNameCustomer} {reservationsOfMyVehicle.lastNameCustomer} </p>
              <p><i className="fas fa-users"></i> {reservationsOfMyVehicle.person}</p>
              <p>
                  <i className="fas fa-calendar-week"></i> {reservationsOfMyVehicle.startDate}{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "15px"
                    }}
                  >
                    To
                  </span>{" "}
                  <i className="fas fa-calendar-week"></i> {reservationsOfMyVehicle.endDate}
                </p>
              <p><i className="fas fa-dollar-sign"></i> {reservationsOfMyVehicle.price}</p>
              </div>
            </div>
        </div>
        );
      });
    }
  };

  renderListReservation = () => {
    if (this.props.reservations.length > 0) {
      return this.props.reservations.map(reservation => {
        return (
          <div key={reservation._id} className="card-product-user">
            <img src={reservation.image} alt="background" />
            <div className="card-product-user-infos">
              <h2>{reservation.name}</h2>
              <p>
                <i className="fas fa-users"></i> {reservation.person}
              </p>
              <p>
                <i className="fas fa-calendar-week"></i> {reservation.startDate}{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: "15px"
                  }}
                >
                  To
                </span>{" "}
                <i className="fas fa-calendar-week"></i> {reservation.endDate}
              </p>
              <p>
                <i className="fas fa-dollar-sign"></i> {reservation.price}
              </p>
            </div>
          </div>
        );
      });
    }
  };
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
                    process.env.PUBLIC_URL + "/images/background.jpg" ||
                    null
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

                <Link
                  to={`/user/edit/${this.props.authenticated._id}`}
                  className="btn-floating halfway-fab waves-effect waves-light red"
                >
                  <i className="material-icons">edit</i>
                </Link>
              </div>
              <div className="card-content">
                <span className="card-title grey-text text-darken-4">
                  Details
                </span>
                <p>
                  <i className="far fa-envelope"></i>{" "}
                  {this.props.authenticated.email}
                </p>
                <p>
                  <i className="fas fa-phone-square"></i>{" "}
                  {this.props.authenticated.phone}
                </p>
              </div>
            </div>
          </div>
          <div className="col s12 m6">
            <div style={{padding:10}} className="card">
            <h5 className="card-title grey-text text-darken-4">
              Reservation 
            </h5>
                {this.renderListReservation()}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <h5 className="card-title grey-text text-darken-4">
              Your vehicle(s)
            </h5>
            <div className="list-vehicle-user">
            <ul className="collapsible">
              {this.renderListVehicle()}
            </ul>
              
            </div>
            <p className="right">
              Rent Your vehicle{" "}
              <Link
                className="btn-floating  waves-effect waves-light red"
                to={`/user/${this.props.authenticated_id}/createVehicle`}
              >
                <i className="material-icons">add</i>
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToPros(state) {
  console.log(state)
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
