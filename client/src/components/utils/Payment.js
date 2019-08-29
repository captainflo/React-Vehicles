import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions'; 

class Payments extends React.Component{
    render(){
        const money = (this.props.money * 100)
        return (
            <StripeCheckout
                amount={money}
                token={token => this.props.handleToken(token, money )}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                name="Vehicle Trip"
                description="Book your vehicle"
                onClick={this.props.submitReservation}
            >
                <button  className="modal-close  btn waves-effect waves-light color-web">Payment</button>
            </StripeCheckout>
        )
    }
}

export default connect(null, actions)(Payments);