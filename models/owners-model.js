const mongoose=require('mongoose');

const ownersSchema=mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
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
// const mongoose=require('mongoose');

// const userSchema=mongoose.Schema({
//     fullname:{
//         type:String,
//         minLength:10,
//         trim:true
//     },
//     email:String,
//     password:String,
//     cart:{
//         type:Array,
//         default:[]
//     },
//     isadmin:Boolean,
//     orders:{
//         type:Array,
//         default: []
//     },
//     contact:Number,
//     picture:String
// })

// module.exports=mongoose.model('user',userSchema);