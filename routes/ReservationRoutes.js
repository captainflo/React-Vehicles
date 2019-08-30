const controllers = require("../controllers/reservationController");

module.exports = app => {
    app.get('/api/reservation/:id', controllers.getReservation);
    app.get('/api/reservationOfMyVehicle/:id', controllers.getReservationMyVehicle);
}



