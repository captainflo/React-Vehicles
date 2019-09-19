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
        <div class="slider">
          <ul class="slides slideDown">
            <li>
            <img
            style={{width:'100%'}}
            src={process.env.PUBLIC_URL + "/images/lambo.jpg"}
            alt="background"
          />
              <div class="caption">
                <h3 className='center'>Time to rent your vehicle!</h3>
                <div className="centered fadeIn">
                  <SearchHome/>
                </div>
              </div>
            </li>
            
          </ul>
        </div>

        <div className='row center concept'>
          <h4>Concept</h4>
          <div className='col m4 s12'>
            <p>Select your City</p>
            <i className="fas fa-city"></i>
          </div>
          <div className='col m4 s12'>
          <p>Select Your Vehicle</p>
            <i class="fas fa-car"></i>
            <i class="fas fa-motorcycle"></i>
            <i class="fas fa-ship"></i>
          </div>
          <div className='col m4 s12'>
          <p>Reserve it</p>
            <i class="fas fa-file-signature"></i>
          </div>
        </div>


      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}

export default compose(connect(mapStateToProps))(Welcome);
