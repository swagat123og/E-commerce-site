const userModel = require('../models/user-model');
const userSchema = require('../models/user-model');
const jwt = require('jsonwebtoken');


module.exports= async function(req,res,next){
    if(!req.cookies.token){
        req.flash("error","you need to logged in");
        return res.redirect("/");
    }

    try{
        let decode = jwt.verify(req.cookie.token,process.env.JTW_KEY);
        let user = await userSchema.findOne({email:decode.email})
        .select("-password");
        req.user=user;
        next();

    }catch(err){
        req.flash("error","Some thing Went Wrong");
        res.redirect("/");
    }
};