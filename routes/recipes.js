const express = require("express");
const router  = express.Router();
const Recipe = require("../models/recipe");

router.get("/", (req, res) =>  res.render("recipes/index"));

router.get("/new", (req, res) =>  res.render("recipes/new"));



module.exports = router;



