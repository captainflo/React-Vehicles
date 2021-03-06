const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const vehicleSchema = new Schema({
    name: String,
    city: String,
    type: String,
    userId: String,
    image: String,
    lat: Number,
    lng: Number,
    address: String,
    price: Number
});

// Create the model class
const ModelClass = mongoose.model('vehicles', vehicleSchema);

// Export the model
module.exports = ModelClass