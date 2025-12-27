const mongoose=require('mongoose');

const ownersSchema=mongoose.Schema({
    fullname:{
        type:String,
        minLength:10,
        trim:true
    },
    email:String,
    password:String,
    products:{
        type:Array,
        default: []
    },
    gstIn:String,
    picture:String
})

module.exports=mongoose.model('owners',ownersSchema);