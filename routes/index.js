const   express = require("express"),
        router  = express.Router({mergeParams: true}),
        passport = require("passport"),
        User = require("../models/user");

//ROOT route
router.get("/", (req, res) =>  res.render("landing"));

//show REGISTER form
router.get("/register", (req, res) => res.render("register"));

//REGISTER logic
router.post("/register", (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to Recipe 5.0 " + user.username);
            res.redirect("/recipes");
        });
    });
});

//show LOGIN form
router.get("/login", (req, res) => res.render("login"));

//LOGIN logic
router.post("/login", passport.authenticate("local",
    {
            successRedirect: "/recipes",
            failureRedirect: "/login"
    }), (req, res) => {
        console.log("Logged in!");
        req.login();
        res.redirect("/recipes");
});

//LOGOUT
router.get("/logout", (req, res) => {
    req.logOut();
    req.flash("success", "Thank you for visiting!");
    res.redirect("/recipes");
});

module.exports = router;