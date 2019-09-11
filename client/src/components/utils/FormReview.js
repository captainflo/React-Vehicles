import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as actions from "../actions";
import M from "materialize-css/dist/js/materialize.min.js";


class FormReview extends React.Component {
  state = {
    score: "",
    text: "",
    error:''
  };

  componentDidMount() {
    this.props.getReservationByUser(this.props.auth._id);
    const elemsModal = document.querySelectorAll(".modal");
    M.Modal.init(elemsModal, {});
  }

  createReview = event => {
    event.preventDefault();
    if(this.state.text === '' ||  this.state.score === ''){
      this.setState({error: 'Put comment or score'})
    }
    if(this.state.text !== '' &&  this.state.score !== ''){
      this.props.getReviewByVehicle(this.props.vehicleId);
      event.preventDefault();
      const form = {
        vehicleId: this.props.vehicleId,
        comment: this.state.text,
        score: this.state.score,
        customerID: this.props.auth._id,
        customerImage: this.props.auth.avatar
      };
      this.props.createReview(form)
      this.props.getReviewByVehicle(this.props.vehicleId);
      this.setState({score: '', text:'', error: ''})
    }
  };

  handleChangeFormReview=(event)=> {
    this.setState({
      score: event.target.value
    });
  }

  handleChangeText = event => this.setState({ text: event.target.value });

  renderFom = () =>{
    const reservations = this.props.reservations.reservation
    for (let i = 0; i < reservations.length; i++) {
      const reservation = reservations[i].vehicleId;
      if (reservation === this.props.vehicleId){
        return (
          <div>
            <MuiThemeProvider>
              <form>
                <div className="row">
                  <div className="box-make-review">
                    <div className="input-field col s12 m12">
                      <i className="material-icons prefix">textsms</i>
                      <textarea
                        id="textarea1"
                        className="materialize-textarea"
                        onChange={this.handleChangeText}
                        value={this.state.text}
                      ></textarea>
                      <label htmlFor="textarea1">Write your review</label>
                    </div>
                  </div>
                  <div className="col s12 m12">
                    <fieldset className="rating">
                      <input onClick={this.handleChangeFormReview} type="radio" id="star5" name="rating" value="5" /><label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
                      <input onClick={this.handleChangeFormReview} type="radio" id="star4half" name="rating" value="4.5" /><label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
                      <input onClick={this.handleChangeFormReview} type="radio" id="star4" name="rating" value="4" /><label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                      <input onClick={this.handleChangeFormReview} type="radio" id="star3half" name="rating" value="3.5" /><label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
                      <input onClick={this.handleChangeFormReview} type="radio" id="star3" name="rating" value="3" /><label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
                      <input onClick={this.handleChangeFormReview} type="radio" id="star2half" name="rating" value="2.5" /><label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
                      <input onClick={this.handleChangeFormReview} type="radio" id="star2" name="rating" value="2" /><label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                      <input onClick={this.handleChangeFormReview} type="radio" id="star1half" name="rating" value="1.5" /><label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
                      <input onClick={this.handleChangeFormReview} type="radio" id="star1" name="rating" value="1" /><label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
                      <input onClick={this.handleChangeFormReview} type="radio" id="starhalf" name="rating" value="0.5" /><label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
                    </fieldset>
                  </div>
                </div>
                <div style={{ color: "red" }}>{this.state.error}</div>
                <button className="waves-effect waves-light btn btn-color " onClick={this.createReview}>Create Review</button>
              </form>
            </MuiThemeProvider>
          </div>
        )
      }
      
    }
  }

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
