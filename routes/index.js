var express = require("express");
var router = express.Router();
const userModel = require("./users");
const upload = require('./multer')
const localStrategy = require("passport-local");
const passport = require("passport");
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});
router.get("/profile", isLoggedIn, async function (req, res, next) {
  let user = await userModel.findOne({username : req.session.passport.user})
  res.render("profile",{user});
});
router.get("/login", function (req, res, next) {
  res.render("login",{error : req.flash("error")});
});
router.get("/feed",isLoggedIn,function (req, res, next) {
  res.render("feed");
});
router.post("/register", function (req, res) {
  const { username, email, fullname } = req.body;
  const userdata = new userModel({ username, email, fullname });
  userModel
    .register(userdata, req.body.password)
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
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {}
);
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
router.post("/upload",upload.single('file'),(req,res)=>{
  if(!req.file){
    return res.status(400).send("No files were uploaded.") ;
  }
  res.send("file uploaded successfully!") ;
}) ;
module.exports = router;
