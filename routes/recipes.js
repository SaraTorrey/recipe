const   express = require("express"),
        router  = express.Router({mergeParams: true}),
        Recipe = require("../models/recipe"),
        middleware = require("../middleware");

//INDEX - display all recipes
router.get("/", (req, res) => {
    // Get all recipes from DB
    Recipe.find({}, (err, allRecipes) => {
        if(err){
            console.log(err);
        } else {
            res.render("recipes/index",{recipes:allRecipes});
        }
    });
});

//CREATE - a NEW Recipe

router.post("/", middleware.isLoggedIn, (req, res) => {

    let name = req.body.name;
    let image = req.body.image;

    let ingredient1 = req.body.ingredient1;
    let ingredient2 = req.body.ingredient2;
    let ingredient3 = req.body.ingredient3;
    let ingredient4 = req.body.ingredient4;
    let ingredient5 = req.body.ingredient5;
    let description = req.body.description;
    let amount1 = req.body.amount1;
    let amount2 = req.body.amount2;
    let amount3 = req.body.amount3;
    let amount4 = req.body.amount4;
    let amount5 = req.body.amount5;

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
        author:         author
    };
    Recipe.create(newRecipe, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else {
            //redirect back to Recipes page
            console.log(newlyCreated);
            res.redirect("recipes");
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
    Recipe.findById(req.params.id).populate("comments").exec((err, foundRecipe) => {
        if (err) {
            console.log(err);
        } else {
            console.log(foundRecipe);
            //render show template with that recipe
            res.render("recipes/show", {recipe: foundRecipe});
        }
    });
});

//EDIT recipe
router.get("/:id/edit", middleware.checkRecipeOwnership, (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        res.render("recipes/edit", {foundRecipe});
    });
});

//UPDATE recipe
router.put("/:id", middleware.checkRecipeOwnership, (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, (err, updatedRecipe) => {
        if (err) {
            res.redirect("/recipes");
        } else {
            res.redirect("/recipes/" + req.params.id, {updatedRecipe});
        }
    });
});

//DELETE recipe
router.delete(":/id", middleware.checkRecipeOwnership, (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/recipes");
        } else {
            res.redirect("recipes");
        }
    });
});


module.exports = router;



