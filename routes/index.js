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
router.post("/getCategory", (req,res)=>{
  
  var offset;
  var page = parseInt(req.body.page);
		if(page != 'NaN' && page > 0) {
			offset = (page - 1 ) * 10;
		} else{
			offset = 0;
		}

  models.category.findAll({
    limit: 10,
    offset : offset
  }).then((data)=>{
      res.json({
          status :200,
          data : data
      })
  })
})
  
  module.exports = router;