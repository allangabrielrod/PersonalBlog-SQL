require("dotenv").config();

const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("working");
});

app.listen(process.env.PORT, () => {
    console.log(`running at ${process.env.PORT}`);
});