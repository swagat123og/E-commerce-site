const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');
const userSchema = require('../models/user-model');

module.exports.registerUser = async function (req, res) {
    try {
        let { password, email, fullname } = req.body;
        let registeredUser = await userSchema.findOne({ email: email });
        if (registeredUser) return res.status(401).send("you already registerd");
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        let createdUser = await userSchema.create({
            password: hash, email, fullname
        })
        let token = generateToken(createdUser);
        res.cookie("token", token);
        res.redirect("/");
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }

}

module.exports.loginUser = async function (req, res) {
    try {
        let { password, email } = req.body;

        let user = await userSchema.findOne({ email });
        if (!user) {
            req.flash("error", "User does not exist");
            return res.redirect("/");
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash("error", "Invalid credentials");
            return res.redirect("/");
        }

        let token = generateToken(user);
        res.cookie("token", token);
        res.redirect("/shop")
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
};


module.exports.logOut = async function(req,res){
       res.cookie("token", "");
       res.redirect("/");
}