require("dotenv").config();

const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//routes
const indexRoute = require(__dirname + "/routes");

app.use("/", indexRoute);

app.listen(process.env.PORT, () => {
    console.log(`running at ${process.env.PORT}`);
});