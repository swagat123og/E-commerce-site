const express = require("express");
const router = express.Router();
const isLoggedIn= require("../middlewares/isLoggedIn");
const productSchema = require("../models/product-mode");
const userSchema=require("../models/user-model");

router.get('/', (req, res) => {
    let error =req.flash("error");
    res.render('index',{error,isLoggedIn:false});
});

router.get('/shop', isLoggedIn,async function (req, res) {
    try {
        const products = await productSchema.find();
        let success= req.flash("success"); // 🔥 fetch products
        res.render("shop", { products,success});             // 🔥 pass products
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/");
    }
});


router.get('/product/addtocart', isLoggedIn, async (req, res) => {
    try {
        // get logged-in user with cart populated
        const user = await userSchema
            .findById(req.user._id)
            .populate("cart");

        let success = req.flash("success");

        res.render("cart", {
            success,
            cartProducts: user.cart   // ✅ ONLY cart products
        });

    } catch (err) {
        console.error(err);
        res.redirect("/shop");
    }
});


router.get('/product/removefromcart/:id', isLoggedIn, async (req, res) => {
    try {
        const productId = req.params.id;

        const user = await userSchema.findById(req.user._id);
        if (!user) {
            return res.redirect('/product/addtocart');
        }

        // ✅ remove productId from cart array
        user.cart = user.cart.filter(
            id => id.toString() !== productId
        );

        await user.save();

        req.flash("success", "Product removed from cart");
        res.redirect('/product/addtocart');

    } catch (err) {
        console.error(err);
        res.redirect('/product/addtocart');
    }
});



router.get('/product/addtocart/:id',isLoggedIn, async (req, res) => {
    try {
        const productId = req.params.id;

        // ✅ find user by ID (BEST PRACTICE)
        const user = await userSchema.findById(req.user._id);

        if (!user) {
            console.log("User not found");
            return res.redirect('/');
        }

        // avoid duplicates
        if (!user.cart.includes(productId)) {
            user.cart.push(productId);
            await user.save();
        }
        req.flash("success","Product is Added");
        res.redirect('/product/addtocart');

    } catch (err) {
        console.error(err);
        res.redirect('/shop');
    }
});




router.get('/logout',isLoggedIn,function(req,res){
    res.redirect("/");
})

module.exports = router;
