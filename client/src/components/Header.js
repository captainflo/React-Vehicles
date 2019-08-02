import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import { Modal } from "react-materialize";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";

class Header extends React.Component {
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
            <Link to="/signout">Signout</Link>
          </li>
          <li>
            <Link to="/feature">feature</Link>
          </li>
          <li>
            <Link to={`/user/${this.props.authenticated._id}`}>
              <img
                className="avatar"
                src={
                  this.props.authenticated.avatar ||
                  process.env.PUBLIC_URL + "/images/background.jpg"
                }
                alt="background"
              />
            </Link>
          </li>
        </div>
      );
    } else {
      return (
        <div>
          <Modal trigger={<a href="#/">login</a>}>
            <div style={{ padding: "30px" }}>
              {!this.state.signup && (
                <div>
                  <Signin />
                  <div className="center">
                    <a href="#/" onClick={this.DisplaySignup}>
                      You don't have a Account? Sign up!
                    </a>
                  </div>
                </div>
              )}
              {this.state.signup && (
                <div>
                  <Signup />
                  <div className="center">
                    <a href="#/" onClick={this.DisplaySignin}>
                      You have a Account? Sign in!
                    </a>
                  </div>
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
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link className="brand-logo" to="/">
              <i
                style={{ paddingLeft: "15px" }}
                className="large material-icons"
              >
                wb_cloudy
              </i>
            </Link>
            <a href="#/" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.renderLinks()}
            </ul>
          </div>
        </nav>
        <Sidebar />
      </div>
    );
  }
}

function mapStateToPros(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToPros)(Header);
