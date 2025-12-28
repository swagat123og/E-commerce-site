const express = require('express');
const router = express.Router();
const userSchema = require('../models/user-model');
const cookieParser = require('cookie-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken}=require('../utils/generateToken');
const {registerUser}=require('../controllers/authController');


router.get('/',function (req, res) {
    res.send("hey")
});
router.post('/register',registerUser);


module.exports = router;