import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";

class InfoUser extends React.Component {
  componentDidMount() {
    this.props.getUserId(this.props.match.params.id);
    this.props.getVehicleByUser(this.props.match.params.id);
  }

  renderListVehicle = () => {
    if (this.props.vehicles.length > 0) {
      return this.props.vehicles.map(vehicle => {
        return (
          <Link
            to={`/vehicle/${vehicle._id}`}
            key={vehicle._id}
            className="card-product"
            style={{marginBottom: '20px'}}
          >
            <img src={vehicle.image} alt="background"/>
            <div className="card-product-infos">
              <h2>{vehicle.name}</h2>
              <p>
                <i className="fas fa-building"></i> {vehicle.city}
              </p>
              <p>
                <i className="fas fa-dollar-sign"></i> {vehicle.price} /Half Day
              </p>
            </div>
          </Link>
        );
      });
    }
  };

  render() {
    if (!this.props.infoUser) {
      return <div>waiting...</div>;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="card-profile">
            <div className="center">
              <img src={this.props.infoUser.avatar} alt="background" />
            </div>
            <div className="card-profile-content">
              <h4 className="center">
                {this.props.infoUser.firstName}
                {""} {this.props.infoUser.lastName}{" "}
              </h4>
              
            </div>
          </div>
        </div>
        {this.renderListVehicle()}
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
    reservationsOfMyVehicles: state.reservation.reservationOfMyVehicle,
    infoUser: state.auth.infoUser
  };
}

export default connect(
  mapStateToPros,
  actions
)(InfoUser);
