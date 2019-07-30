const express = require("express");
const router  = express.Router();
const Recipe = require("../models/recipe");

router.get("/", (req, res) =>  res.render("recipes/index"));



module.exports = router;



