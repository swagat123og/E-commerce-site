// 🔥 dotenv MUST be first
require('dotenv').config({ quiet: true });

// Basic Express
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require("express-session");
const flash = require("connect-flash");

// Database
const db = require('./config/mongoose-connection');

// Models (optional to require here)
const userSchema = require('./models/user-model');
const productSchema = require('./models/product-mode');
const ownersSchema = require('./models/owners-model');

// Routes
const ownersRouter = require('./routes/ownersRouter');
const productRouter = require('./routes/productRouter');
const usersRouter = require('./routes/usersRouter');
const indexRouter= require('./routes/indexRouter');

// View Engine
app.set('view engine', 'ejs');

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(
  expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET,
  })
)
app.use(flash());

// Routes usage
app.use('/', indexRouter);
app.use('/owners', ownersRouter);
app.use('/product', productRouter);
app.use('/users', usersRouter);


// Server
app.listen(3000, () => {
  console.log('🚀 Server running on port 3000');
});
