const express=require('express');
const router=express.Router();
const upload = require('../config/multer-config');
const ownerModel=require('../models/owners-model');
const productSchema=require('../models/product-mode');

router.get('/admin',function(req,res){
   let success= req.flash("success");
    res.render("createproducts", { success});
});

if(process.env.NODE_ENV==="development"){
    router.post('/create',async function(req,res){
    let owners=await ownerModel.find();
    if(owners.length>0) {return res.status(500).send("you have no permissions");}
    let {fullname,email,password}=req.body
     let createdOwner=await ownerModel.create({
        fullname,email,password
     });
    res.status(201).send(createdOwner);
    });
}

module.exports=router;