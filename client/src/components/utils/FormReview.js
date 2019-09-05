import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import * as actions from "../actions";
import M from "materialize-css/dist/js/materialize.min.js";

class FormReview extends React.Component {
  state = {
    score: "",
    text: ""
  };

  componentDidMount() {
    this.props.getReservationByUser(this.props.auth._id);
    const elemsModal = document.querySelectorAll(".modal");
    M.Modal.init(elemsModal, {});
  }

  createReview = event => {
    event.preventDefault();
    const form = {
      vehicleId: this.props.vehicleId,
      comment: this.state.text,
      score: this.state.score,
      customerID: this.props.auth._id,
      customerImage: this.props.auth.avatar
    };
    console.log(form);
    this.props.createReview(form)
  
  };

  renderFom = () =>{
    const reservations = this.props.reservations.reservation
    for (let i = 0; i < reservations.length; i++) {
      const reservation = reservations[i].vehicleId;
      if (reservation === this.props.vehicleId){
        return (
          <div>
            <h4>Make a Review</h4>
            <MuiThemeProvider>
              <form>
                <div className="row">
                  <div className="input-field col s12">
                    <textarea
                      id="textarea1"
                      className="materialize-textarea"
                      onChange={this.handleChangeText}
                      value={this.state.text}
                    ></textarea>
                    <label htmlFor="textarea1">Textarea</label>
                  </div>
                </div>
                <div className="row">
                  <div className="Boxinput">
                    <SelectField
                      className="color-field"
                      floatingLabelText="Start Time"
                      value={this.state.score}
                      onChange={this.handleChangeFormReview}
                    >
                      <MenuItem value={1} label="1" primaryText="1" />
                      <MenuItem value={2} label="2" primaryText="2" />
                      <MenuItem value={3} label="3" primaryText="3" />
                      <MenuItem value={4} label="4" primaryText="4" />
                    </SelectField>
                  </div>
                </div>
                <button onClick={this.createReview}>here</button>
              </form>
            </MuiThemeProvider>
          </div>
        )
      }
      
    }
  }

  handleChangeFormReview = (event, index, value) =>
    this.setState({ score: value });

  handleChangeText = event => this.setState({ text: event.target.value });

  render() {
    return (
      <div>
        {this.renderFom()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    reservations: state.reservation,
    vehicle: state.vehicles,
    user: state.auth.user,
    reviews: state.review.review
  };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  )
)(FormReview);
