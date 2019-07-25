import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Sidebar from './Sidebar';
import { Modal} from 'react-materialize';
import Signin from './auth/Signin';
import Signup from './auth/Signup';

class Header extends React.Component {
  
    renderLinks() {
    if (this.props.authenticated || this.props.authReducer) {
      return (
        <div>
          {!this.props.authReducer ? (
            <Link to="/signout">signout</Link>
          ) : (
            <a href="/api/logout">signout</a>
          )}
          <Link to="/feature">feature</Link>
        </div>
      );
    } else {
      return (
        <div>
            <Modal header="Modal Header" trigger={<a href="#/">login</a>}>
                <p>
                    <Signin/>
                </p>
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
            <Link to="/">Redux Auth</Link>
            <a href="#/" className="brand-logo">
              Logo
            </a>
            <a href="#/" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>{this.renderLinks()}</li>
              <li>
                <a href="badges.html">Components</a>
              </li>
              <li>
                <a href="collapsible.html">JavaScript</a>
              </li>
            </ul>
          </div>
        </nav>
        <Sidebar/>
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

export default connect(mapStateToPros)(Header);
