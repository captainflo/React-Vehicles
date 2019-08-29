const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const Reservation = require('../models/Reservation');

module.exports = app => {
    app.post('/api/stripe',  async (req,res) =>{
        const money = req.body.amount
        const charge = await stripe.charges.create({
            amount: money,
            currency: 'usd',
            description: 'vehicle trip book',
            source: req.body.token.id
        })
        res.send(charge);
        // // req.user from passport because inex.js initialize and session
        // req.user.credits += 5;
        // const user = await req.user.save();
        // res.send(user);
    });
}