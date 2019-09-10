import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../actions";
import { Slide, Slider } from "react-materialize";
import Reservation from "../utils/Reservation.js";
import Review from "../utils/Review.js";
import FormReview from "../utils/FormReview";

class VehicleShow extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.getVehicleById(this.props.match.params.id);
    this.props.getUserByVehicleId(this.props.match.params.id);
    this.props.getReviewByVehicle(this.props.match.params.id);
  }
  
  render() {
    if (!this.props.vehicle.length > 0) {
      return (
        <div style={{ marginTop: "10%" }} className="center">
          <p>Loading...</p>
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (!this.props.user) {
      return (
        <div style={{ marginTop: "10%" }} className="center">
          <p>Loading...</p>
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="box-slider-vehicle slideRight">
          <Slider options={{ indicators: false }}>
            <Slide
              image={<img src={this.props.vehicle[0].image} alt="background" />}
            ></Slide>
          </Slider>
        </div>
        <div className="row">
          <div className="col m6">
            <div className="container-vehicle-show">
              <h4 style={{color: 'rgba(0,0,0,.6)'}}>{this.props.vehicle[0].name} <span className="right">
                <img className="avatar" src={this.props.user.avatar} alt='avatar'/>
                <br></br>
                <span className='title-avatar'>{this.props.user.firstName}</span>
              </span></h4>
              <p className='text-vehicle' style={{color: 'rgba(0,0,0,.6)'}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <Review vehicleId={this.props.vehicle[0]._id}/>
              <FormReview vehicleId={this.props.vehicle[0]._id}/>
            </div>
          </div>
          <div className="col m6">
            {this.props.auth && <Reservation/>}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
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
)(VehicleShow);
