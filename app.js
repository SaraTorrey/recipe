const   express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        flash           = require("connect-flash"),
        passport        = require("passport"),
        LocalStrategy   = require("passport-local"),
        methodOverride  = require("method-override");
        Recipe          = require("./models/recipe");
        Comment         = require("./models/comment");
        User            = require("./models/user");
        seedDB          = require("./seeds");


const   commentRoutes   = require("./routes/comments");
        recipeRoutes    = require("./routes/recipes");
        indexRoutes     = require("./routes/index");

const   jQuery = require('jquery');

mongoose.connect( "mongodb://localhost:27017/restful_recipe", {
        useNewUrlParser: true,
        useCreateIndex: true,
    }). then (() => {
        console.log("Connected to DB!");
    }).catch(err =>{
        console.log("Error",err.message);
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use( bodyParser.urlencoded( {extended: true} ) );
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Food is good!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/recipes", recipeRoutes);
app.use("/recipes/:id/comments", commentRoutes);

app.listen( 3000, process.env.IP, function () {
    console.log( "Recipe has started!" );
} );