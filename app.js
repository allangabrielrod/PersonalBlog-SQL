require("dotenv").config();

const express       = require("express"),
      bodyParser    = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(__dirname + "/public"));

//routes
const indexRoute = require(__dirname + "/routes");
const postsRoute = require(__dirname + "/routes/posts");

app.use("/", indexRoute);
app.use("/posts", postsRoute);

app.listen(process.env.PORT, () => {
    console.log(`running at ${process.env.PORT}`);
});