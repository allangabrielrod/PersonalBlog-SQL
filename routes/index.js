const express       = require("express"),
      router        = express.Router(),
      middleware    = require("../middleware"),
      passport      = require("passport"),
      User          = require("../models/User");


router.get("/", (req, res) => {
    res.redirect("/posts");
});

router.get("/login", middleware.notAuthenticated, (req, res) => {
    res.render("login");
});

router.post("/login", middleware.notAuthenticated, passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/login"
}));

router.get("/register", middleware.registerPermissions, (req, res) => {
    res.render("register");
});

router.post("/register", middleware.registerPermissions, (req, res) => {
    const { username, fname, lname, adminToken, password } = req.body;
    const newUser = { 
        username, 
        fname, 
        lname, 
        isAdmin: (adminToken === process.env.ADMIN_TOKEN) 
    }

    User.register(newUser, password, (err) => {
        if(!err)
            res.redirect("/login");
        else {
            console.error(err);
            res.redirect("back");
        }
        
    })
});

router.get("/logout", middleware.isAuthenticated, (req, res) => {
    req.logOut();
    res.redirect("/");
});

module.exports = router;