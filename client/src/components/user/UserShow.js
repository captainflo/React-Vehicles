import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UserShow extends React.Component {
  render() {
    // const {id} = this.props.authenticated._id || this.props.authReducer._id
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <div className="card">
              <div className="top-left">
                <img
                  className="avatar-card z-depth-5"
                  src={
                    this.props.authReducer.avatar ||
                    process.env.PUBLIC_URL + "/images/background.jpg"
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
                  {this.props.authReducer.firstName}{" "}
                  {this.props.authReducer.lastName}
                </span>

                <Link to={`/user/edit/${this.props.authReducer._id}`} className="btn-floating halfway-fab waves-effect waves-light red">
                  <i className="material-icons">edit</i>
                </Link>
              </div>
              <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">
                  Details
                </span>
                <p><i className="far fa-envelope"></i> {this.props.authReducer.email}</p>
              </div>
            </div>
          </div>
          <div className="col s12 m6">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={process.env.PUBLIC_URL + "/images/water.jpg" } alt="background"/>
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  Reservation<i className="material-icons right">more_vert</i>
                </span>
                <p>
                  <a href="/#">This is a link</a>
                </p>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  Card Title<i className="material-icons right">close</i>
                </span>
                <p>
                  Here is some more information about this product that is only
                  revealed once clicked on.
                </p>
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
    authReducer: state.authReducer
  };
}

export default connect(mapStateToPros)(UserShow);
