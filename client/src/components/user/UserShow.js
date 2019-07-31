import React from "react";
import { connect } from "react-redux";

class UserShow extends React.Component {
  
  render() {
    return (
       <div>User</div>
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


