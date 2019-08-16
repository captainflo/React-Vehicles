const controllers = require("../controllers/vehiclesController");

module.exports = app => {
  // Get all vehicles
  app.get('/api/vehicles', controllers.getAllVehicle);
  // Post vehicles 
  app.post('/api/user/:id/createVehicle', controllers.createVehicle);
  // Get vehicles by Id user
  app.get('/api/user/:id/myVehicles',controllers.getVehicleByUser);
};
