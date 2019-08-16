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
    console.log('server req.body',req.body)
    console.log('server req.params',req.params.id)
    const userId = req.params.id
    const name = req.body.name;
    const type = req.body.type;
    const city = req.body.city;

    const vehicle = new Vehicle({
        name: name,
        type: type,
        city: city,
        userId: userId
    });

    vehicle.save(function(error, vehicle){
        if (error){return next(error);}
        res.send(vehicle)
    })
}

exports.getVehicleByUser = function(req,res,next){
    console.log('server req.params',req.params.id)
    Vehicle.find({userId: req.params.id})
    .then(function(dbVehicle){
        res.json(dbVehicle)
    })
    .catch(function(error){
        res.json(error);
    })
}

