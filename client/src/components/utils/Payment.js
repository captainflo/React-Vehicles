import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter } from 'react-router-dom';
import { compose } from "redux";

class Payments extends React.Component{
    render(){
        const form = this.props.submitReservation
        const money = (form.price * 100);
        const formReservation ={
            vehicleId: form.vehicleId,
            image: form.image,
            name: form.name,
            userCustomerId: form.userCustomerId,
            OwnerId: form.OwnerId,
            price: money,
            startDate: form.startDate,
            endDate: form.endDate,
            person: form.person,
            imageCustomer: form.imageCustomer,
            fistNameCustomer: form.fistNameCustomer,
            lastNameCustomer: form.lastNameCustomer,
          }

        return (
            <StripeCheckout
                amount={money}
                token={token => this.props.handleToken(token, formReservation, () => {
                    this.props.history.push(`/user/${this.props.auth._id}`);
                  } )}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                name="Vehicle Trip"
                description="Book your vehicle"
                onClick={this.props.submitReservation}
            >
                <button className="modal-close  btn waves-effect waves-light color-web">Payment</button>
            </StripeCheckout>
        )
    }
}
function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
  }

export default compose(withRouter,connect(mapStateToProps, actions))(Payments);