const express=require('express');
const router=express.Router();
const ownerModel=require('../models/owners-model');

router.get('/',function(req,res){
    res.send("owner home")
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