import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

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
            style={{ marginBottom: '20px' }}
          >
            <img src={vehicle.image} alt="background" />
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
          <div className="">
            <div className="center">
              <img
                style={{ marginTop: '40px' }}
                className="avatar-large"
                src={this.props.infoUser.avatar}
                alt="background"
              />
            </div>
            <div className="card-profile-content">
              <h4 style={{ color: '#f4f4f4' }} className="center">
                {this.props.infoUser.firstName}
                {''} {this.props.infoUser.lastName}{' '}
              </h4>
              <a
                style={{
                  textAlign: 'center',
                  color: '#f4f4f4',
                  fontSize: '20px'
                }}
                href={`mailto:${this.props.infoUser.email}`}
                rel="noopener noreferrer"
                target="_blank"
                className=""
              >
                <i className="far fa-comment-dots"></i> Send Message
              </a>
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

export default connect(mapStateToPros, actions)(InfoUser);
