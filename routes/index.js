const express   = require("express"),
      router    = express.Router(),
      passport  = require("passport");

router.get("/", (req, res) => {
    res.redirect("/posts");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/login"
}));

module.exports = router;