const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/posts");
});

router.get("/posts", (req, res) => {
    res.render("home");
});

module.exports = router;