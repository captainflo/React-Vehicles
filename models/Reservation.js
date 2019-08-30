const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const reservationSchema = new Schema({
    vehicleId: String,
    OwnerId: String,
    userCustomerId: String,
    image: String,
    name: String,
    price: Number,
    startDate: String,
    endDate: String,
    person: Number,
    paid: Boolean,
    imageCustomer: String,
    fistNameCustomer: String,
    lastNameCustomer: String,
});

// Create the model class
const ModelClass = mongoose.model('reservations', reservationSchema);

// Export the model
module.exports = ModelClass