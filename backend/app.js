//require frameworks
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");

//require data models
const Post = require("./models/post");
const Comment = require("./models/comment");
const User = require("./models/user");
const Tag = require("./models/tag");
const Team = require("./models/team");

//require routes
const commentRoutes = require("./routes/comment");
const activityRoutes = require("./routes/activity");
const indexRoutes = require("./routes/index");
const postRoutes = require("./routes/post");
const tagRoutes = require("./routes/tag");
const teamRoutes = require("./routes/team");
const userRoutes = require("./routes/user");

const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost/wegroup';

mongoose.connect(databaseUri, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connect to DB");
}).catch(err => {
    console.log("ERROR", err.message);
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');

//passport setup
app.use(require("express-session")({
    secret: "hqryyls",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//middleware to check if user logged in
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/activity", activityRoutes);
app.use("/tag", tagRoutes);
app.use("/post", postRoutes);
app.use("/post/:postId/comment", commentRoutes);
app.use("/post/:postId/team", teamRoutes);

app.listen(process.env.PORT, function () {
    console.log("The Server Has Started!");
});