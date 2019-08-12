let Recipe = require("../models/recipe"),
    Comment = require("../models/comment");

let middlewareObj = {};

middlewareObj.checkRecipeOwnership = (req, res, next) => {
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
        req.flash("error", "Please Login First!");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Permission Denied!");
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please login first!");
    res.redirect("/login");
};

module.exports = middlewareObj;