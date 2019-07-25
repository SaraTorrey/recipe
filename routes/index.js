const   express = require("express");
const   router  = express.Router();
        Recipe = require("../models/recipe");
//      middleware = require("../middleware");

router.get("/", (req, res) =>  res.render("landing"));


module.exports = router;