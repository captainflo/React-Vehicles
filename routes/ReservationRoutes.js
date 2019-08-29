const controllers = require("../controllers/reservationController");

module.exports = app => {
    app.get('/api/reservation/:id', controllers.getReservation);
    app.post('/api/reservation', controllers.createReservation);
}



