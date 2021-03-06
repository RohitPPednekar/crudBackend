var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var models = require('../models/index.js');
var router  = express.Router();


/** 
 * Input :- None
 * Output : JSON Object
 * Description :- Get route for main url for rendering category
*/
router.post("/getCategory", (req,res)=>{
  
  var offset;
  var page = parseInt(req.body.pages);
		if(page != 'NaN' && page > 0) {
      offset = (page - 1 ) * 10;
		} else{
      offset = 0;
		}
    
  models.category.findAll({
    limit: 10,
    offset : offset
  }).then((data)=>{
    if(data){
      res.json({
          status :200,
          data : data
      })
    }else{
      res.json({
        status : 401,
        message : "Some Error on server, Please try after some time !"
      })
    }
  })
})


/** 
 * Input :- Page body param
 * Output : JSON Object
 * Description :- Get route for main url for rendering products
*/
router.post("/getProducts", (req,res)=>{
  
  var offset;
  var page = parseInt(req.body.page);
		if(page != 'NaN' && page > 0) {
			offset = (page - 1 ) * 10;
		} else{
			offset = 0;
    }
    var condition;
  if(req.body.category_id!=undefined){
    condition = {
      attributes:['id','name'],
      limit: 10,
      offset : offset,
      where : {
        category_id : req.body.category_id
      },
      include :[
        {
          model : models.category,
          attributes:['id','name'],
        }
      ]
    }
  }else{
    condition = {
      attributes:['id','name'],
      limit: 10,
      offset : offset,
      include :[
        {
          model : models.category,
          attributes:['id','name'],
        }
      ]
    }
  }

  models.product.findAll(condition).then((data)=>{
    
    if(data){
        res.json({
          status :200,
          data : data
      })
    }else{
      res.json({
        status : 401,
        message : "Some Error on server, Please try after some time !"
      })
    }
  })
})



router.post('/addCategory',(req,res)=>{
  var id = req.body.id;
  models.category.findOne({
    where:{
      id : id
    }
  }).then((categoryData)=>{
    if(categoryData!=null){
      
      categoryData.update({
        name : req.body.name
      }).then((updatedCategory)=>{
          if(updatedCategory){
            res.json({
              status : 200,
              message : "Category values updated !"
            })
          }else{
            res.json({
              status : 401,
              message : "Some Error on server, Please try after some time !"
            })
          }
          
      })
    }else{
      

      models.category.create({
        name : req.body.name
      }).then((createdCategory)=>{
        if(createdCategory){
          res.json({
            status : 200,
            message : "Created succesfully category !",
            data :createdCategory
          })
        }else{
          res.json({
            status : 401,
            message : "Some Error on server, Please try after some time !"
          })
        }
      })
    }
  })
})


router.post('/addProduct',(req,res)=>{
  var id = req.body.id;
  models.product.findOne({
    where:{
      id : id
    }
  }).then((productData)=>{
    if(productData!=null){
      
      productData.update({
        name : req.body.name
      }).then((updatedProduct)=>{
          if(updatedProduct){
            res.json({
              status : 200,
              message : "Product values updated !"
            })
          }else{
            res.json({
              status : 401,
              message : "Some Error on server, Please try after some time !"
            })
          }
          
      })
    }else{


      models.product.create({
        name : req.body.name,
        category_id: req.body.category_id
      }).then((createdProduct)=>{
        if(createdProduct){
          res.json({
            status : 200,
            message : "Created succesfully category !",
            data :createdProduct
          })
        }else{
          res.json({
            status : 401,
            message : "Some Error on server, Please try after some time !"
          })
        }
      })
    }
  })
})



router.post('/removeCategory',(req,res)=>{
  models.category.findOne({
    where:{
      id : req.body.id
    }
  }).then((categoryData)=>{
    if(categoryData!=null){
      //delete all the products related to category as there be no presence of category then
      models.product.destroy({
        where:{
          category_id : req.body.id
        }
      }).then((deletedProductsCategory)=>{
          
            models.category.destroy({
              where:{
                id : req.body.id
              }
            }).then((deletedCategory)=>{
              if(deletedCategory){
                  res.json({
                    status : 200,
                    message : "Category Deleted successfully !"
                  })
              }else{
                res.json({
                  status : 401,
                  message : "Some Error on server, Please try after some time !"
                })
              }  
            });    
         
          
      })
    }else{
      res.json({
        status : 200,
        message : "Requested category not present !"
      })
    }
  })
})


router.post('/removeProducts',(req,res)=>{
  models.product.findOne({
    where:{
      id : req.body.id
    }
  }).then((productData)=>{
    if(productData!=null){
      //delete the product
      models.product.destroy({
        where:{
          id : req.body.id
        }
      }).then((deletedProduct)=>{
          if(deletedProduct){
                res.json({
                    status : 200,
                    message : "Product Deleted successfully !"
                  })
           
          }else{
            res.json({
              status : 401,
              message : "Some Error on server, Please try after some time !"
            })
          }
          
      })
    }else{
      res.json({
        status : 200,
        message : "Requested product not present !"
      })
    }
  })
})
  
  module.exports = router;