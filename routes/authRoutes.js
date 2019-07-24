const Authenticate = require("../controllers/authentication");
const passport = require("passport");

const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = app => {
   app.get('/', requireAuth, function(req, res){
       res.send({hi: 'there'})
   })

   app.post('/signup', Authenticate.signup);
  // Google Auth
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  app.get("/auth/google/callback", passport.authenticate("google"));

  // Logout user
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  // Current User
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
