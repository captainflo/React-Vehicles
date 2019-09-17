import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";

class ConfirmReservation extends React.Component {
  render() {
    return (
      <div className="center" style={{ color: "#f4f4f4" }}>
        <h4>Congratulation</h4>
        <p>Your reservation is succed</p>
        <p>
          You can check your reservation on the onglet reservation{' '}
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
)(ConfirmReservation);
