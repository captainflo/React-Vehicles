import React from "react";
import { connect } from "react-redux";
import { Modal } from "react-materialize";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import { Link } from "react-router-dom";

class Sidebar extends React.Component {
  state = {
    signup: false
  };

  DisplaySignup = () => {
    this.setState({ signup: true });
  };

  DisplaySignin = () => {
    this.setState({ signup: false });
  };

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <li>
            <Link to="/signout">
              <i className="material-icons">cloud</i> Signout
            </Link>
          </li>
          <li>
            <Link to="/feature">
              <i className="material-icons">cloud</i> feature
            </Link>
          </li>
        </div>
      );
    } else {
      return (
        <div>
          <Modal
            trigger={
              <li>
                <a href="#/">
                  <i className="material-icons">cloud</i> Login
                </a>
              </li>
            }
          >
            <div>
              {!this.state.signup && (
                <div>
                  <Signin />
                  <a href="#/" onClick={this.DisplaySignup}>
                    You don't have a Account? Sign up!
                  </a>
                </div>
              )}
              {this.state.signup && (
                <div>
                  <Signup />
                  <a href="#/" onClick={this.DisplaySignin}>
                    You don't have a Account? Sign up!
                  </a>
                </div>
              )}
            </div>
          </Modal>
        </div>
      );
    }
  }

  render() {
    return (
      <ul id="slide-out" className="sidenav">
        <li>
          <div className="user-view">
            <div className="background">
              <img
                src={process.env.PUBLIC_URL + "/images/water.jpg"}
                alt="background"
              />
            </div>
            {this.props.authenticated ? (
              <span>
                <Link to={`/user/${this.props.authenticated._id}`}>
                  <img
                    className="circle"
                    src={
                      this.props.authenticated.avatar ||
                      process.env.PUBLIC_URL + "/images/background.jpg"
                    }
                    alt="avatar"
                  />
                </Link>
                <a href="#name">
                  <span className="white-text name">
                    {this.props.authenticated.firstName || null}{" "}
                    {this.props.authenticated.lastName || null}
                  </span>
                </a>
                <span>
                  <span className="white-text email">
                    {this.props.authenticated.email}
                  </span>
                </span>
              </span>
            ) : (
              <div style={{paddingBottom: '10px'}}>
                <a href="#/">
                  <img
                    className="circle"
                    src={process.env.PUBLIC_URL + "/images/background.jpg"}
                    alt="avatar"
                  />
                </a>
              </div>
            )}
          </div>
        </li>
        {this.renderLinks()}
        <li>
          <div className="divider" />
        </li>
      </ul>
    );
  }
}

function mapStateToPros(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToPros)(Sidebar);
