const express = require('express');
const router = express.Router();
const isLoggedIn=require('../middlewares/isLoggedIn')

const {
  registerUser,
  loginUser,
  logOut
} = require('../controllers/authController');

router.get('/', (req, res) => {
  res.send("Users home");
});

router.get('/logout', logOut);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
