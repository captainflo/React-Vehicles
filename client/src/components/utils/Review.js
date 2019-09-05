import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../actions";

class Review extends React.Component {
  
  // componentWillReceiveProps(prevProps, nextProps, next) {
  //     this.props.getReviewByVehicle(this.props.vehicleId);
 
  // }

  renderListReview = () => {
    if (this.props.reviews.length > 0) {
      return this.props.reviews.map(review => {
        return (
          <div key={review._id} className="card-product-review">
            <img src={review.customerImage} alt="background" />
            <div className="card-product-review-infos">
              <p>
                {" "}
                <i className="fas fa-comments"></i> {review.comment}
              </p>
              <p>
                {" "}
                <i className="fas fa-star"></i> {review.score}
              </p>
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
      for (let i = 0; i < array.length; i++) {
        const count = array[i].score;
        totalScore += count;
      }
      const totalStar = totalScore / array.length;
      return (
        <span>
          {totalStar} <i className="fas fa-star"></i>
        </span>
      );
    }
  };

  render() {
    if (!this.props.reviews.length > 0) {
      return <div><h4>Review {this.renderScorefinal()}</h4>No review</div>;
    }
    return (
      <div>
        <h4>Review {this.renderScorefinal()}</h4>
        <div className='block-review'>
          {this.renderListReview()}
        </div>
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
    reviews: state.review.review
  };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  )
)(Review);
