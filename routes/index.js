var express = require("express");
var router = express.Router();
const userModel = require("./users");
const localStrategy = require("passport-local");
const passport = require("passport");
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/profile",isLoggedIn,function (req, res, next) {
  res.send("profile");
});
router.post("/register", function (req, res) {
  const { username, email, fullname } = req.body;
  const userdata = new userModel({ username, email, fullname });
  userModel
    .register(userdata.req.body.passport)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    });
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  function (req, res) {}
);
router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
function isLoggedIn (req,res,next)
{
  if(req.isAuthenticated()){
    return next() ;
  }
  res.redirect("/") ;
}
module.exports = router;
