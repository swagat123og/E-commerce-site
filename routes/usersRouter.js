const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  logOut
} = require('../controllers/authController');

router.get('/', (req, res) => {
  res.send("Users home");
});

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout',logOut);

module.exports = router;
