const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

router.get("/new", (req, res) => {
    res.render("posts/new");
});

router.get("/", (req, res) => {
    Post.find((err, foundPosts) => {
        if(!err)
            res.render("home", {posts: foundPosts});
    });
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

router.get("/:id", (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        if(!err) {
            res.render("posts/show", foundPost);
        } else {
            res.redirect("/posts");
        }
    })
});

router.get("/:id/edit", (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        if (!err) {
            res.render("posts/edit", foundPost);
        } else {
            res.redirect("back");
        }
    })
});

router.put("/:id", (req, res) => {
    const { title, content } = req.body;
    const editedPost = { title, content };
    Post.findByIdAndUpdate(req.params.id, editedPost, (err) => {
        if (!err) {
            res.redirect("/posts/" + req.params.id);
        } else {
            res.redirect("back");
        }
    });
});

module.exports = router;