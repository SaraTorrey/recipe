const express = require("express");
const router  = express.Router({mergeParams: true});
let   Recipe = require("../models/recipe");
let   Comment = require("../models/comment");
let   middleware = require("../middleware");

//NEW Comments
router.get("/new", middleware.isLoggedIn, (req, res) => {
    //find recipe by id
    console.log(req.params.id);
    Recipe.findById(req.params.id,  (err, recipe) => {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {recipe: recipe});
        }
    })
});

//CREATE Comments
router.post("/", middleware.isLoggedIn, (req, res) => {
    //find recipe using id
    Recipe.findById(req.params.id, function (err, recipe) {
        if (err) {
            req.flash("error", "Something went wrong!");
            res.redirect("/recipes");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    req.flash("error", "Not Found!");
                    console.log(err);
                } else {
                    //add username & id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    recipe.comments.push(comment);
                    recipe.save();
                    console.log(comment);
                    req.flash("success", "Your comment has been successfully created.");
                    res.redirect("/recipes/" + recipe._id);
                }
            });
        }
    });
});

//EDIT comments
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id,(err, foundComment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.render("/recipes/edit" + {recipe_id: req.params.id, comment: foundComment});
        }
    })
});

//UPDATE comment
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/recipes/" + {comment_id: req.params.id, comment: updatedComment});
        }
    });
});

// DELETE comment
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment Deleted!");
            res.redirect("/recipes/" + req.params.id);
        }
    });
});

module.exports = router;