const express = require("express");
const router = express.Router();
const isLoggedIn= require("../middlewares/isLoggedIn");
const productSchema = require("../models/product-mode");


router.get('/', (req, res) => {
    let error =req.flash("error");
    res.render('index',{error,isLoggedIn:false});
});

router.get('/shop', async function (req, res) {
    try {
        const products = await productSchema.find(); // 🔥 fetch products
        res.render("shop", { products});             // 🔥 pass products
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/");
    }
});

router.get('/logout',isLoggedIn,function(req,res){
    res.redirect("/");
})

module.exports = router;
