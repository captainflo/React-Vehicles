import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";

class ConfirmVehicle extends React.Component {
  render() {
    return (
      <div className="center" style={{ color: "#f4f4f4" }}>
        <h4>Congratulation</h4>
        <p>Your vehicle was created</p>
        <p>
          You can check your vehcle on the onglet Vehicle{' '}
           <Link
            className="btn  waves-effect waves-light btn-color"
            to={`/user/${this.props.auth._id}`}
          >
            here
          </Link>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    vehicle: state.vehicles,
    user: state.auth.user
  };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  )
)(ConfirmVehicle);
