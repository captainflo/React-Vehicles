import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import * as actions from "../actions";

class Review extends React.Component {
  state = {
    score: "",
    text: ""
  };
  createReview = event => {
    event.preventDefault();
    const form = {
      vehicleId: this.props.vehicle[0]._id,
      comment: this.state.text,
      score: this.state.score,
      customerID: this.props.auth._id,
      customerImage: this.props.auth.avatar
    };
    console.log(form);

    this.props.createReview(form);
    this.props.getReviewByVehicle(this.props.vehicle[0]._id);
  };

  renderListReview = () => {
    if (this.props.reviews.length > 0) {
      return this.props.reviews.map(review => {
        return (
          <div key={review._id}>
            <div ref={review._id}>
              <img
                className="avatar"
                src={review.customerImage}
                alt="background"
              />
              <div className="card-product-infos">
                <p>
                  <i className="fas fa-star"></i> {review.score}
                </p>
                <p>
                  <i className="fas fa-comments"></i> {review.comment}
                </p>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  renderScorefinal = () => {
    if (this.props.reviews.length > 0) {
      let array = this.props.reviews;
      let totalScore = 0;
      console.log(array);
      for (let i = 0; i < array.length; i++) {
        const count = array[i].score;
        totalScore += count;
        console.log(totalScore);
      }
      const totalStar = totalScore / array.length;
      return (
        <span>
          {totalStar} <i className="fas fa-star"></i>
        </span>
      );
    }
  };

  renderForm = () => {
        return (
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
        );
  
    }


  handleChangeFormReview = (event, index, value) =>
    this.setState({ score: value });

  handleChangeText = event => this.setState({ text: event.target.value });

  render() {
    if (!this.props.reviews.length > 0) {
      return <div>No review</div>;
    }
    return (
      <div>
        <h4>Review {this.renderScorefinal()}</h4>
        {this.renderListReview()}

       {this.renderForm()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    reservations: state.reservation,
    vehicle: state.vehicles,
    user: state.auth.user,
    reviews: state.review
  };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  )
)(Review);
