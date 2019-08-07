import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import M from "materialize-css/dist/js/materialize.min.js";

class Welcome extends React.Component {
  componentDidMount() {
    // Slider
    const elems = document.querySelector(".slider");
    M.Slider.init(elems, {
      indicators: false,
      duration: 500,
      height: 700
    });

    // DatePicker
    const elem = document.querySelectorAll(".datepicker");
    M.Datepicker.init(elem, {});

    // select Form
    const elemForm = document.querySelectorAll("select");
    M.FormSelect.getInstance(elemForm);
    M.FormSelect.init(elemForm, {});
  }
  render() {
    return (
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
                  <form>
                <div className="row">
                  <div className="col s6 m3">
                    <div className="input-field">
                      <input
                        type="text"
                        className="datepicker"
                        name="startDate"
                        id="startDate"
                      />
                      <label htmlFor="startDate">Start Date</label>
                    </div>
                  </div>
                  <div className="col s6 m3">
                    <div className="input-field">
                      <label>Pick up at</label>
                      <Field name="" component="select">
                        <option/>
                        <option value="#ff0000">Red</option>
                        <option value="#00ff00">Green</option>
                        <option value="#0000ff">Blue</option>
                      </Field>
                    </div>
                  </div>
                  <div className="col s6 m3">
                    <div className="input-field">
                      <input
                        type="text"
                        className="datepicker"
                        name="endDate"
                        id="endDate"
                      />
                      <label htmlFor="endDate">End Date</label>
                    </div>
                  </div>
                  <div className="col s6 m3">
                    <div className="input-field">
                      <input
                        type="text"
                        className="datepicker"
                        name="startDate"
                        id="startDate"
                      />
                      <label htmlFor="startDate">Start Date</label>
                    </div>
                  </div>
                </div>
                </form>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: "search" })
)(Welcome);
