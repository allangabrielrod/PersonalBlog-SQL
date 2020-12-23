require("dotenv").config();

const express = require("express"),
  bodyParser = require("body-parser"),
  bcrypt = require("bcrypt"),
  methodOveride = require("method-override"),
  session = require("client-sessions"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  User = require("./models/User");

const app = express();

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(methodOveride("_method"));

app.use(
  session({
    cookieName: "session",
    secret: process.env.CK_SECRET,
    duration: 60 * 60 * 1000,
    cookie: {
      httpOnly: true,
      ephemeral: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const foundUser = await User.findAll({ where: { username } });
      const user = foundUser[0].dataValues;

      if (!user) return done(null, false);

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const { password, ...userInfo } = user;
        return done(null, userInfo);
      }

      return done(null, false);
    } catch (e) {
      return done(null, false);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const foundUser = await User.findByPk(id);

    if (foundUser) {
      const { password, ...userInfo } = foundUser.dataValues;
      return done(null, userInfo);
    }

    return done(null, false);
  } catch (e) {
    return done(e, false);
  }
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(express.static(__dirname + "/public"));

//routes
const indexRoute = require(__dirname + "/routes");
const postsRoute = require(__dirname + "/routes/posts");

app.use("/", indexRoute);
app.use("/posts", postsRoute);

app.listen(process.env.PORT, () => {
  console.log(`running at ${process.env.PORT}`);
});
