import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../actions";
import { Slide, Slider, Caption } from "react-materialize";

class VehicleShow extends React.Component {

    componentDidMount(){
      this.props.getVehicleById(this.props.match.params.id)
      this.props.getUserByVehicleId(this.props.match.params.id)
    }



  render() {
    console.log(this.props.user)
    if (!this.props.vehicle.length > 0){
      return  <div style={{ marginTop: "10%" }} className="center">
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
    }
    if (!this.props.user){
      return  <div style={{ marginTop: "10%" }} className="center">
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
    }
    return (
      <div>
        <div className='box-slider-vehicle slideRight'>
        <Slider options={{indicators: false}} >
          <Slide  image={<img src={this.props.vehicle[0].image}/>}>
          </Slide>
        </Slider>
        </div>
        <div className='row'>
          <div className="col m6">
              <h4>{this.props.vehicle[0].name}</h4>
          </div>
          <div className="col m6">
            {this.props.user.firstName}
            <img className='avatar' src={this.props.user.avatar}/>
          </div>
        </div>
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return { 
    auth: state.auth.authenticated,
    vehicle: state.vehicles,
    user: state.auth.user
};
}

export default compose(
  connect(
    mapStateToProps,
    actions
  )
)(VehicleShow);
