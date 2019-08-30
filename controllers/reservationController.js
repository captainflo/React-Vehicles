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

// Get my Reservation by userId
exports.getReservationMyVehicle = function(req,res,next){
    Reservation.find({OwnerId: req.params.id})
    .then(function(dbReservation){
        res.json(dbReservation)
    })
    .catch(function(error){
        res.json(error);
    })
}



//Create reservation
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
    const imageCustomer = req.body.imageCustomer;
    const fistNameCustomer = req.body.fistNameCustomer;
    const lastNameCustomer = req.body.lastNameCustomer;

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
}




