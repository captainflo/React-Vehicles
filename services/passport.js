const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

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