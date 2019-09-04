const Review = require('../models/Review');

exports.getReviewByVehicle = function (req,res,next){
    Review.find({vehicleId: req.params.id})
    .then(function(dbReview){
        res.json(dbReview)
    })
    .catch(function(error){
        res.json(error);
    })
};

exports.createReview = function(req,res,next){
    console.log('here')
    const vehicleId = req.body.vehicleId;
    const comment = req.body.comment;
    const score = req.body.score;
    const customerID = req.body.customerID;
    const customerImage = req.body.customerImage

    const review = new Review({
        vehicleId: vehicleId,
        comment: comment,
        score: score,
        customerID: customerID,
        customerImage: customerImage,
    });

    review.save(function(error, review){
        if (error){return next(error);}
        res.send(review)
    })
}



