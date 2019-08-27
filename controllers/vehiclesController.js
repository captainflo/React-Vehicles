const Vehicle = require('../models/Vehicle');

exports.getAllVehicle = function (req,res,next){
    Vehicle.find({})
    .then(function(dbVehicle){
        res.json(dbVehicle)
    })
    .catch(function(error){
        res.json(error);
    })
};

exports.createVehicle = function(req,res,next){
    const userId = req.params.id
    const name = req.body.name;
    const type = req.body.type;
    const city = req.body.city;
    const image = req.body.image
    const lat = req.body.lat
    const lng = req.body.lng
    const address = req.body.address
    const price = req.body.price

    const vehicle = new Vehicle({
        name: name,
        type: type,
        city: city,
        image: image,
        userId: userId,
        address: address,
        lat: lat,
        lng: lng,
        price: price
    });

    vehicle.save(function(error, vehicle){
        if (error){return next(error);}
        res.send(vehicle)
    })
}

exports.getVehicleByUser = function(req,res,next){
    Vehicle.find({userId: req.params.id})
    .then(function(dbVehicle){
        res.json(dbVehicle)
    })
    .catch(function(error){
        res.json(error);
    })
}

exports.getVehicleByCity = function(req,res,next){
    Vehicle.find({city: req.params.city})
    .then(function(dbVehicle){
        res.send(dbVehicle)
    })
    .catch(function(error){
        res.json(error);
    })
}

exports.getVehicleById = function(req,res,next){
    Vehicle.find({_id: req.params.id})
    .then(function(dbVehicle){
        res.send(dbVehicle)
    })
    .catch(function(error){
        res.json(error);
    })
}


