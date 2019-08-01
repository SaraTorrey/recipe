const   express = require("express");
        router  = express.Router();
        passport = require("passport");
        Recipe = require("../models/recipe");
//      middleware = require("../middleware");

router.get("/", (req, res) =>  res.render("landing"));

router.get("/login", (req, res) => res.render("login"));

router.post("/login", passport.authenticate("local",
    {
            successRedirect: "/recipes",
            failureRedirect: "/login"
    }), function(req,res) {

        console.log("haha");
});

//REGISTER
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


router.get("/logout", function(req, res){
        req.logout();
        res.redirect("/recipes");
});

// router.get("/logout", function (req, res) {
//         req.logOut();
//         req.flash("success", "You have successfully logged out!");
//         res.redirect("/recipes");
// });

module.exports = router;