const User = require('../models/User');
const jwt = require('jwt-simple');
const config = require('../config/keys');

// function for uncode user  
function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, email: user.email, iat: timestamp}, config.secret);
}

exports.signup = function(req,res,next){
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(422).send({error: 'You must provide email and password'});
    }
    // See if user with the given email exists
    User.findOne({email: email}, function(error, existingUser){
        if (error){return next(error)};
        // if a user with email does exist, return an error
        if (existingUser){
            return res.status(422).send({error: 'Email is in use'});
        }
        // if a user with email does not exist, create and save record
        const user = new User({
            email: email,
            password: password
        });

        user.save(function(error){
            if (error){return next(error);}
            // respond to request indicating the user was created
            res.json({token: tokenForUser(user)});
        })
    })
}

exports.signin = function (req,res,next){
    // user has already had their email and password auth
    // we just need to give them a token
    res.send({token: tokenForUser(req.user)});
}

exports.fetchUser = function (req,res,next){
    console.log(req.params.id)
    User.findOne({_id: req.params.id}, function(error, user){
        if (error){return next(error)};
           res.send(user); 
           console.log('server side id', user);
    })
}

exports.editUser = function (req,res,next){
    console.log('editUser', req.body)
    console.log(req.params.id)
    User.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,
        
        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,
        
        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        {new: true},
        
        // the callback function
        (err, user) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(user);
        }
    )
}
