const controllers = require("../controllers/vehiclesController");

module.exports = app => {
  // Get all vehicles
  app.get('/api/vehicles', controllers.getAllVehicle);
  // Get vehicles by Id
  app.get('/api/vehicle/:id', controllers.getVehicleById);
  // Post vehicles 
  app.post('/api/user/:id/createVehicle', controllers.createVehicle);
  // Get vehicles by Id user
  app.get('/api/user/:id/myVehicles',controllers.getVehicleByUser);

  // Get vehicles by city
  app.get('/api/city/:city', controllers.getVehicleByCity)
};
