import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";

class UserShow extends React.Component {
  componentDidMount(){
    this.props.fetchUser();
  }
  
  render() { 
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
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
  };
}

export default connect(mapStateToPros, actions)(UserShow);
