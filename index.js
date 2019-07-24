const express = require("express");
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/User');
require('./services/passport');

// Create Cookie Session
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./routes/authRoutes')(app);

// Connect Mongo Atlas
mongoose.connect(keys.mongoURI, {useNewUrlParser: true});


// Server Setup
const PORT = process.env.PORT || 3001;
console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
app.listen(PORT);

