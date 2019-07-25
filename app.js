const   express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        flash           = require("connect-flash");
        passport        = require("passport");
        LocalStrategy   = require("passport-local");
        Recipe          = require("./models/recipe");
        Comment         = require("./models/comment");
        User            = require("./models/user");
        // seedDB          = require("./seeds");

const   commentRoutes    = require("./routes/comments");
        recipesRoutes   = require("./routes/recipes");
        indexRoutes      = require("./routes/index");

mongoose.connect( "mongodb://localhost:27017/restful_recipe", {useNewUrlParser: true} );

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Food is good!",
    resave: false,
    saveUninitialized: false
}));

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use("/", indexRoutes);

app.listen( 3000, process.env.IP, function () {
    console.log( "Recipe has started!" );
} );