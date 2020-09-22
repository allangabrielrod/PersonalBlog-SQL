const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

router.get("/new", (req, res) => {
    res.render("posts/new");
});

router.post("/", (req, res) => {
    const {title, content} = req.body;
    const newPost = { title, content };
    Post.create(newPost, (err, savedPost) => {
        if(!err) {
            res.redirect("/");
        } else {
            res.redirect("back");
        }
    });
});

module.exports = router;