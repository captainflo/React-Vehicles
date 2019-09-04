const controllers = require("../controllers/reviewController");

module.exports = app => {
    app.post('/api/review/', controllers.createReview);
    app.get('/api/review/:id', controllers.getReviewByVehicle)
}



