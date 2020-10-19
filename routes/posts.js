const express   = require("express"),
      router    = express.Router(),
      sanitizer = require("sanitizer");

const Post = require("../models/Post");

router.get("/new", (req, res) => {
    res.render("posts/new");
});

router.get("/", (req, res) => {
    Post.find().sort({ created: -1 }).exec((err, foundPosts) => {
      if (!err) res.render("home", { posts: foundPosts });
    });
});

router.get("/search", (req, res) => {
    const { q } = req.query;
    Post.find({ title: { $regex: q, $options: "i" } }, 
        (err, foundPosts) => {
            if(err)
                res.redirect("back");
            else
                res.render("search", {posts: foundPosts});
        }
    );
});

router.post("/", (req, res) => {
    req.body.content = sanitizer.sanitize(req.body.content);
    const {title, content} = req.body;
    const {id, username, fname, lname} = req.user;
    const newPost = { title, content };
    newPost.author = {id, username, fname, lname}

    Post.create(newPost, (err, savedPost) => {
        if(!err) {
            res.redirect("/");
        } else {
            res.redirect("back");
        }
    });
});

router.get("/:title", (req, res) => {
    const reqTitle = req.params.title.toLowerCase();

    Post.find((err, foundPosts) => {
        if(err) res.redirect("/posts");

        const post = foundPosts.find((post) => post.title.toLowerCase() === reqTitle);

        if (post) {
            res.render("posts/show", post);
        } else {
            res.redirect("/posts");
        }
    });
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

router.delete("/:id", (req, res) => {
    Post.findByIdAndDelete(req.params.id, (err) => {
        if(!err)
            res.redirect("/posts");
        else
            res.redirect("back");
    });
});

module.exports = router;