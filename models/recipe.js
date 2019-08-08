const mongoose = require("mongoose");

let recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    ingredient1 : String,
    ingredient2 : String,
    ingredient3 : String,
    ingredient4 : String,
    ingredient5 : String,
    amount1 : Number,
    amount2 : Number,
    amount3 : Number,
    amount4 : Number,
    amount5 : Number,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

console.log('mapped it');
module.exports = mongoose.model("Recipe", recipeSchema);
