import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Search from "./Search";

class Welcome extends React.Component {

  render() {
    return (
      <div>
        <Search />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}

export default compose(connect(mapStateToProps))(Welcome);
