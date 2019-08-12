var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var models = require('../models');
var router  = express.Router();


/** 
 * Input :- None
 * Output : JSON Object
 * Description :- Get route for main url for rendering category
*/
router.get("/", (req,res)=>{
    
  models.category.findAll().then((data)=>{
      res.json({
          status :200,
          data : data
      })
  })
})
  
  module.exports = router;