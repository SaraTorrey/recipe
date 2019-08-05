let Recipe = require("../models/recipe"),
    Comment = require("../models/comment");

let middlewareObj ={};

middlewareObj.checkRecipeOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Recipe.findById(req.params.id, function (err, foundRecipe) {
            if (err) {
                req.flash("error", "Recipe Not Found!");
                res.redirect("back");
            } else {
                // does user own the campground?
                if (foundRecipe.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Permission Denied!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Login First!");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOWnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Recipe.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                req.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Permission Denied!");
                    req.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()){
        return(next);
    }
    req.flash("error", "Please Login First!");
    req.flash("/login");
};

module.exports = middlewareObj;