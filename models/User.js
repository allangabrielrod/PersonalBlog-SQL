const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    fname: String,
    lname: String,
    password: String
});

module.exports = mongoose.model("user", UserSchema);