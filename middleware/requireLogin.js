module.exports = (req,res, next) => {
    if(!req.user){
        return res.status(401).send({error: 'You must log in!'});
    }
    // otherwise go to the next middleware
    next();
};