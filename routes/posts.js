const express = require("express");
const router = express.Router();

router.get("/new", (req, res) => {
    res.render("posts/new");
});

router.post("/", (req, res) => {
    res.json(req.body);
});

module.exports = router;