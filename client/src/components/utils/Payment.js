import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions'; 

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
                token={token => this.props.handleToken(token, formReservation )}
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

export default connect(null, actions)(Payments);