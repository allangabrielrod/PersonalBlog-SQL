const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    created: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("post", PostSchema);