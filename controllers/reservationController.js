const Reservation = require('../models/Reservation');

// Get my Reservation by userId
exports.getReservation = function(req,res,next){
    Reservation.find({userCustomerId: req.params.id})
    .then(function(dbReservation){
        res.json(dbReservation)
    })
    .catch(function(error){
        res.json(error);
    })
}

// Create reservation
exports.createReservation = function(req,res,next){
    const vehicleId = req.body.vehicleId;
    const userCustomerId = req.body.userCustomerId;
    const OwnerId = req.body.OwnerId;
    const price = req.body.price;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const person = req.body.person;
    const image = req.body.image;
    const name = req.body.name;

    const reservation = new Reservation({
        vehicleId: vehicleId,
        userCustomerId: userCustomerId,
        price: price,
        OwnerId: OwnerId,
        startDate: startDate,
        endDate: endDate,
        person: person,
        image: image,
        name: name
    });

    reservation.save(function(error, reservation){
        if (error){return next(error);}
        res.send(reservation)
    })
}




