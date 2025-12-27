//Basic Express
const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const path=require('path');

//Requring databases and models
const userSchema=require('./models/user-model');
const productSchema=require('./models/product-mode');
const db=require('./config/mongoose-connection');

// Requring Routes
const ownersRouter=require('./routes/ownersRouter');
const productRouter=require('./routes/productRouter');
const usersRouter=require('./routes/usersRouter');

//For Ejs
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

//Definig Routes
app.use('/owners',ownersRouter);
app.use('/product',productRouter);
app.use('/users',usersRouter);

app.listen(3000);