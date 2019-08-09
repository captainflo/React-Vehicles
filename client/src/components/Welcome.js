import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import M from "materialize-css/dist/js/materialize.min.js";
import SearchBar from "./SearchBar";

class Welcome extends React.Component {
  componentDidMount() {
    // Slider
    const elems = document.querySelector(".slider");
    M.Slider.init(elems, {
      indicators: false,
      duration: 500,
      height: 700
    });
  }

  render() {
    return (
      <div>
        <div className="slider">
          <ul className="slides">
            <li>
              <img
                src={process.env.PUBLIC_URL + "/images/vehicles.png"}
                alt="background"
              />

              <div className="caption center-align">
                <h3>This is our big Chance!</h3>
                <h5 className="light grey-text text-lighten-3">
                  Here's our small slogan.
                </h5>
                <div className="search-input">
                  <SearchBar />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}

export default compose(connect(mapStateToProps))(Welcome);
