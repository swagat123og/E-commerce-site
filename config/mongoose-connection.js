
const mongoose=require('mongoose');

mongoose
.connect("mongodb://127.0.0.1:27017/baggers")
.then(function(){
    console.log("DataBase Connected");
})
.catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection;