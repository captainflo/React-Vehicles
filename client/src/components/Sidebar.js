import React from "react";
import { connect } from "react-redux";

class Sidebar extends React.Component {  
  render() {
    return (
       <ul id="slide-out" className="sidenav">
<li>
  <div className="user-view">
    <div className="background">
      <img
        src={process.env.PUBLIC_URL + "/images/background.jpg"}
        alt="background"
      />
    </div>
    <a href="#user">
      <img
        className="circle"
        src={process.env.PUBLIC_URL + "/images/lechef.jpg"}
        alt="avatar"
      />
    </a>
    <a href="#name">
      <span className="white-text name">John Doe</span>
    </a>
    <a href="#email">
      <span className="white-text email">jdandturk@gmail.com</span>
    </a>
  </div>
</li>
<li>
  <a href="#!">
    <i className="material-icons">cloud</i>First Link With Icon
  </a>
</li>
<li>
  <a href="#!">Second Link</a>
</li>
<li>
  <div className="divider" />
</li>
<li>
  <a href="#/" className="subheader">
    Subheader
  </a>
</li>
<li>
  <a className="waves-effect" href="#!">
    Third Link With Waves
  </a>
</li>
</ul>
    );
  }
}

function mapStateToPros(state) {
  return {
    authenticated: state.auth.authenticated,
    authReducer: state.authReducer
  };
}

export default connect(mapStateToPros)(Sidebar);


