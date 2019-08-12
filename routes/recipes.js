const   express = require("express"),
        router  = express.Router(),
        Recipe = require("../models/recipe"),
        middleware = require("../middleware");

//INDEX - display all recipes
router.get("/", function(req, res){
    // Get all recipes from DB
    Recipe.find({}, function(err, allRecipes){
        if(err){
            console.log(err);
        } else {
            res.render("recipes/index",{recipes:allRecipes});
        }
    });
});

//CREATE - a NEW Recipe
router.post("/", middleware.isLoggedIn, function (req, res) {
    let recipe = newRecipe;
    let name = req.body.name;
    let image = req.body.image;
    let ingredient1 = req.body.ingredient1;
    let ingredient2 = req.body.ingredient2;
    let ingredient3 = req.body.ingredient3;
    let ingredient4 = req.body.ingredient4;
    let ingredient5 = req.body.ingredient5;
    let description = req.body.description;
    let author = {
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
        amount1:        amount1,
        amount2:        amount2,
        amount3:        amount3,
        amount4:        amount4,
        amount5:        amount5,
        description:    description,

    };
    Recipe.create(newRecipe, function (err, newlyCreated) {
        if(err){
            console.log(err);
        } else {
            //redirect back to Recipes page
            console.log(newlyCreated);
            res.render("recipes/show");
        }
    });
 });

//New - show new recipe form
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("recipes/new");
});

//SHOW - more info about each recipe
router.get("/:id", function (req, res) {
    //find recipe with given id
    Recipe.findById(req.params.id).populate("comments").exec(function (err, foundRecipe) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundRecipe);
            res.render("recipes/show", {recipe: foundRecipe});
        }
    });
});



module.exports = router;



