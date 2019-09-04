const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const reviewSchema = new Schema({
    vehicleId: String,
    comment:String,
    score: Number,
    customerID: String,
    customerImage: String
});

// Create the model class
const ModelClass = mongoose.model('reviews', reviewSchema);

// Export the model
module.exports = ModelClass