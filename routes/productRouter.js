const express=require('express');
const router=express.Router();
const upload = require('../config/multer-config');
const productSchema=require('../models/product-mode');

router.post("/create",upload.single("image"),async function(req,res){
try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        if (!req.file) {
            return res.status(400).send("Image required");
        }

        const product = await productSchema.create({
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
            image: req.file.buffer
        });
        req.flash("success","product created success fully.")
        res.redirect('/owners/admin');
    } catch (err) {
        res.status(500).send(err.message);
    }
})

module.exports=router;