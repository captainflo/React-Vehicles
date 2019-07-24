const express = require("express");
const app = express();
require('./services/passport');
require('./routes/authRoutes')(app);



// Server Setup
const PORT = process.env.PORT || 3001;
console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
app.listen(PORT);

