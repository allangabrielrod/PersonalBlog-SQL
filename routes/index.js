const express = require("express"),
  router = express.Router(),
  middleware = require("../middleware"),
  passport = require("passport"),
  bcrypt = require("bcrypt"),
  User = require("../models/User");

router.get("/", (req, res) => {
  res.redirect("/posts");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/login",
  })
);

router.get("/register", middleware.registerPermissions, (req, res) => {
  res.render("register");
});

router.post("/register", middleware.registerPermissions, async (req, res) => {
  const { username, fname, lname, adminToken, password } = req.body;
  console.log(req.body);
  const newUser = {
    username,
    fname,
    lname,
    isAdmin: adminToken === process.env.ADMIN_TOKEN,
  };

  newUser.password = await bcrypt.hash(password, 14);

  try {
    await User.create(newUser);
    res.redirect("/login");
  } catch (e) {
    console.error(e);
    res.redirect("back");
  }
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
