import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import SearchHome from "../utils/SearchHome";

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <div className="Banner">
          {/* <img
            style={{width:'100%'}}
            src={process.env.PUBLIC_URL + "/images/banner.jpg"}
            alt="background"
          /> */}
        </div>
        <div className="centered fadeIn">
          <SearchHome/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}

export default compose(connect(mapStateToProps))(Welcome);
