const User = require("../models/User");

module.exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated())
        next();
    else 
        res.redirect("back");
};

module.exports.notAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated())
        next();
    else
        res.redirect("back");
};

module.exports.registerPermissions = (req, res, next) => {
    User.find({ isAdmin: true }, (err, foundAdmin) => {
        if (!foundAdmin.length > 0 || req.user && req.user.isAdmin) {
            next();
        } else {
            res.redirect("/login");
        }
    }
)}