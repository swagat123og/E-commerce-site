const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken}=require('../utils/generateToken');
const userSchema = require('../models/user-model');

module.exports.registerUser = (function (req, res) {
    try {
        let { password, email, fullname } = req.body;
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

})