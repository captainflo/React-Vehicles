const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const Reservation = require('../models/Reservation');

module.exports = app => {
    app.post('/api/stripe',  async (req,res) =>{
        console.log(req.body)
        const money = req.body.form.price
        
        const charge = await stripe.charges.create({
            amount: money,
            currency: 'usd',
            description: 'vehicle trip book',
            source: req.body.token.id
        })

        const vehicleId = req.body.form.vehicleId;
        const userCustomerId = req.body.form.userCustomerId;
        const OwnerId = req.body.form.OwnerId;
        const price = (req.body.form.price / 100);
        const startDate = req.body.form.startDate;
        const endDate = req.body.form.endDate;
        const person = req.body.form.person;
        const image = req.body.form.image;
        const name = req.body.form.name;
        const imageCustomer = req.body.form.imageCustomer;
        const fistNameCustomer = req.body.form.fistNameCustomer;
        const lastNameCustomer = req.body.form.lastNameCustomer;

    const reservation = new Reservation({
        vehicleId: vehicleId,
        userCustomerId: userCustomerId,
        price: price,
        OwnerId: OwnerId,
        startDate: startDate,
        endDate: endDate,
        person: person,
        image: image,
        name: name,
        imageCustomer: imageCustomer,
        fistNameCustomer: fistNameCustomer,
        lastNameCustomer: lastNameCustomer
    });

    reservation.save(function(error, reservation){
        if (error){return next(error);}
        res.send(reservation)
    })
 
    });
}