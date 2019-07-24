// const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/User');
const keys = require('../config/keys');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// setup option for jwt Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJWt.fromHeader('authorization'),
    secretOrKey: keys.secret
};

// Create Jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    // See if the user Id in the payload exists in our database
    // If does, call 'done' with that other
    // otherwise, call done without a user object
    User.findById(payload.sub, function(err, user){
        if(err){return done(err, false);}
        if(user){
            done(null,user);
        } else {
            done(null, false);
        }
    })
})

// Tell passport to use this strategy
passport.use(jwtLogin);


// Generate token
passport.serializeUser((user, done)=>{
    done(null, user.id)
})


passport.deserializeUser((id, done)=>{
    User.findById(id).then(user =>{
        done(null, user);
    })
});

passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
        console.log('access Token', accessToken);
        console.log('refresh Token', refreshToken);
        console.log('profile', profile);
        // don't have double User with same profileId
        User.findOne({googleId: profile.id})
            .then((existingUser)=>{
                if(existingUser){
                    // We aleready have record with given profile ID
                    done(null, existingUser);
                } else {
                    // we don't have a user with ID, make a new record
                    new User({googleId: profile.id})
                    .save()
                    .then(user => done(null, user));
                }
            })
        
    }
));