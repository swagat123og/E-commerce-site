const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');
const userSchema = require('../models/user-model');

module.exports.registerUser = async function (req, res) {
    try {
        let { password, email, fullname } = req.body;
        let registeredUser = await userSchema.findOne({ email: email });
        if (registeredUser) return res.status(401).send("you already registerd");
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.status(503).send(err.message);
                else {
                    let registeredUser = await userSchema.create({
                        password: hash, email, fullname
                    })
                    // let token = await jwt.sign({ email, id: registeredUser._id }, "passkey",
                    //  { expiresIn: '1h' });
                    let token = generateToken(registeredUser);
                    res.cookie("token", token);
                    res.send("user created ok succesfully");

                }
            });
        });
    } catch (err) {
        console.log(err.message);
    }

}

module.exports.loginUser = async function (req, res) {
    let { password, email } = req.body;
    let loginUser = await userSchema.findOne({ email: email });
    if (!loginUser) return res.send("user not exits");
    bcrypt.compare(password, loginUser.password, function (err, result) {
     if(result){
        let token = generateToken(loginUser);
       res.cookie("token", token);
       res.send("you can login");
     } 
     else{
       return res.send("Some Thing Went Wrong") ;
     }
    });
}