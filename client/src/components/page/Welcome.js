import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import SearchHome from "../utils/SearchHome";
import M from "materialize-css/dist/js/materialize.min.js";

class Welcome extends React.Component {
  componentDidMount() {
    // banner slider
    var elems = document.querySelectorAll('.slider');
    M.Slider.init(elems, {indicators: false});
  }

  render() {
    return (
      <div>
        <div className="slider fullscreen">
          <ul className="slides slideDown">
            <li>
            <img
            style={{width:'100%'}}
            src={process.env.PUBLIC_URL + "/images/lambo.jpg"}
            alt="background"
          />
              <div className="caption">
                <h3 className='center'>Time to rent your vehicle!</h3>
                <div className="centered fadeIn">
                  <SearchHome/>
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
