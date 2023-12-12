var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const upload = require("./multer");
const localStrategy = require("passport-local");
const passport = require("passport");
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login", { error: req.flash("error") });
});
router.get("/profile", isLoggedIn, async function (req, res, next) {
  let user = await userModel.findOne({ username: req.session.passport.user }).populate("posts");
  console.log(user) ;
  res.render("profile", { user });
});
router.get("/show/posts", isLoggedIn, async function (req, res, next) {
  let user = await userModel.findOne({ username: req.session.passport.user }).populate("posts");
  res.render("show", { user });
});
router.get("/add", isLoggedIn, async function (req, res, next) {
  let user = await userModel.findOne({ username: req.session.passport.user });
  res.render("add", { user });
});
router.get("/register", function (req, res, next) {
  res.render("register", { error: req.flash("error") });
});
router.get("/feed", isLoggedIn, async function (req, res, next) {
  let user = await userModel.findOne({ username: req.session.passport.user }).populate("posts");
  const posts = await postModel.find().populate("user") ;
  res.render("feed", { user,posts});
});
router.post(
  "/createpost",
  isLoggedIn,
  upload.single("postimage"),
  async function (req, res, next) {
    let user = await userModel.findOne({ username: req.session.passport.user });
  let post = await postModel.create({
      user: user._id,
      title: req.body.title,
      caption: req.body.caption,
      image: req.file.filename,
    });
     user.posts.push(post._id) ;
     await user.save() ;
     res.redirect("/profile") ;
  }
);
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
    failureRedirect: "/",
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
router.post(
  "/fileupload",
  isLoggedIn,
  upload.single("image"),
  async function (req, res, next) {
    if (!req.file) {
      return res.status(404).send("No files were uploaded.");
    }
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    user.profileImage = req.file.filename;
    await user.save();
    res.redirect("/profile");
    // const post = await postModel.create({
    //   image: req.file.filename,
    //   imageText: req.body.filecaption,
    //   user: user._id,
    // });
    // user.posts.push(post._id);
  }
);
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
module.exports = router;
