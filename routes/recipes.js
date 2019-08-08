const   express = require("express"),
        router  = express.Router(),
        Recipe = require("../models/recipe"),
        middleware = require("../middleware");

router.get("/", (req, res) =>
    Recipe.find({}, function (err, allRecipes) {
        res.render("recipes/index", {recipes: allRecipes})
    }));

//CREATE a NEW Recipe
router.post("/", middleware.isLoggedIn, function (req, res) {

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
        // amount1:        amount1,
        // amount2:        amount2,
        // amount3:        amount3,
        // amount4:        amount4,
        // amount5:        amount5,
        description:    description,

    };
    Recipe.create(newRecipe, function (err, newlyCreated) {
        if(err){
            console.log(err);
        } else {
            //redirect back to Recipes page
            console.log(newlyCreated);
            res.redirect("/recipes");
        }
    });
 });

//New recipe form
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("recipes/new");
});


module.exports = router;



