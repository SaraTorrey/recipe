const express = require("express");
const router  = express.Router();
const Recipe = require("../models/recipe");
const middleware = require("../middleware");

router.get("/", (req, res) =>
    Recipe.find({}, function (err, allRecipes) {
        res.render("recipes/index", {recipes: allRecipes})
    }));

//Create - add new recipe to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    let name        = req.body.name;
    let image       = req.body.image;
    let ingredient1 = req.body.ingredient1;
    let ingredient2 = req.body.ingredient2;
    let ingredient3 = req.body.ingredient3;
    let ingredient4 = req.body.ingredient4;
    let ingredient5 = req.body.ingredient5;
    let description = req.body.description;
    let author      = {
        id: req.user._id,
        username: req.user.username
    };
    let newRecipe = {
        name:           name,
        image:          image,
        ingredient1:    ingredient1,
        ingredient2:    ingredient2,
        ingredient3:    ingredient3,
        ingredient4:    ingredient4,
        ingredient5:    ingredient5,
        description:    description,
        author:         author
    };
    Recipe.create(newRecipe, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/recipes");
        }
    });
});


module.exports = router;



