const   mongoose = require("mongoose"),
        Recipe = require("./models/recipe"),
        Comment = require("./models/comment");

let data = [
    {
        name: "Flower Salad",
        image: "https://theviewfromgreatisland.com/wp-content/uploads/2017/04/Spring-salad-with-edible-flowers-7407-April-11-2017-3.jpg",
        ingredient1:    'Flower',
        ingredient2:    'Lettuce',
        ingredient3:    'Tomatoes',
        ingredient4:    'Shrimp',
        ingredient5:    'Dressing',
        amount1:        2,
        amount2:        3,
        amount3:        1,
        amount4:        5,
        amount5:        2,
        description:    "Mix and Enjoy!",

    },
    {
        name: "Flower Salad",
        image: "https://theviewfromgreatisland.com/wp-content/uploads/2017/04/Spring-salad-with-edible-flowers-7407-April-11-2017-3.jpg",
        ingredient1:    'Flower',
        ingredient2:    'Lettuce',
        ingredient3:    'Tomatoes',
        ingredient4:    'Shrimp',
        ingredient5:    'Dressing',
        amount1:        2,
        amount2:        3,
        amount3:        1,
        amount4:        5,
        amount5:        2,
        description:    "Mix and Enjoy!",

    },
    {
        name: "Flower Salad",
        image: "https://theviewfromgreatisland.com/wp-content/uploads/2017/04/Spring-salad-with-edible-flowers-7407-April-11-2017-3.jpg",
        ingredient1:    'Flower',
        ingredient2:    'Lettuce',
        ingredient3:    'Tomatoes',
        ingredient4:    'Shrimp',
        ingredient5:    'Dressing',
        amount1:        2,
        amount2:        3,
        amount3:        1,
        amount4:        5,
        amount5:        2,
        description:    "Mix and Enjoy!",

    }
];

function seedDB() {
    Recipe.remove({}, function (err) {
        if(err){
            console.log(err);
        }
        console.log('Removed Recipe');

        data.forEach(function (seed) {
            Recipe.create(seed, function (err, recipe) {
                if(err){
                    console.log(err);
                } else {
                    console.log("Recipe Added");
                    Comment.create(
                        {
                            text: "This recipe is delicious!",
                            author: "Sara"
                        }, function (err, comment) {
                            if(err) {
                                console.log(err);
                            } else {
                                recipe.comments.push(comment);
                                recipe.save();
                                console.log("Created a new comment");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;