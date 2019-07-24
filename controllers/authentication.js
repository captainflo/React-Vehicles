const User = require('../models/User');

exports.signup = function(req,res,next){
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
            res.json(user)
        })
    })
}