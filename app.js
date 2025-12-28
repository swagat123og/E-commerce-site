// 🔥 dotenv MUST be first
require('dotenv').config({ quiet: true });

// Basic Express
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');

// Requiring databases and models
const db = require('./config/mongoose-connection');
const userSchema = require('./models/user-model');
const productSchema = require('./models/product-mode');
const ownersSchema = require('./models/owners-model');

// Requiring Routes
const ownersRouter = require('./routes/ownersRouter');
const productRouter = require('./routes/productRouter');
const usersRouter = require('./routes/usersRouter');

// For EJS
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Defining Routes
app.use('/owners', ownersRouter);
app.use('/product', productRouter);
app.use('/users', usersRouter);

app.listen(3000, () => {
  console.log('🚀 Server running on port 3000');
});
