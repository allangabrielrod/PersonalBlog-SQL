require("dotenv").config();

const express       = require("express"),
      bodyParser    = require("body-parser"),
      methodOveride = require("method-override"),
      mongoose      = require("mongoose");

const app = express();

//db connection
mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log("DB Connected."))
.catch(err => console.log(err));
    
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(methodOveride("_method"));

app.use(express.static(__dirname + "/public"));

//routes
const indexRoute = require(__dirname + "/routes");
const postsRoute = require(__dirname + "/routes/posts");

app.use("/", indexRoute);
app.use("/posts", postsRoute);

app.listen(process.env.PORT, () => {
    console.log(`running at ${process.env.PORT}`);
});