const   express = require("express");
const   router  = express.Router();
        Recipe = require("../models/recipe");
        passport        = require("passport");
        middleware = require("../middleware");

router.get("/", (req, res) =>  res.render("landing"));

router.get("/login", (req, res) => res.render("login"));

router.post("/login", passport.authenticate("local",
    {
            successRedirect: "/recipes",
            failureRedirect: "/login"
    }), function(req,res) {

        console.log("haha");
});

router.get("/register", (req, res) => res.render("register"));

router.post("/register", function (req, res) {
        let newUser = new User({username: req.body.username});
        User.register(newUser, req.body.password, function (err, user) {
                if (err) {
                        req.flash("error", err.message);
                        return res.render("register");
                }
                passport.authenticate("local")(req, res, function () {
                        req.flash("success", "Welcome to Recipe 5.0 " + user.username);
                        res.redirect("/recipes");
                });
        });
});

module.exports = router;