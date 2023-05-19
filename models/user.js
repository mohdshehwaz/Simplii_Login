const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    expiryIn:{
        type:Number
    },
    gap:{
        type:Number
    },
    otp:{
        type:Number,
        default:0,
        required:true
    },
    blocked:{
        type:Number,

    },
    count:{
        type:Number,
        default:0
    }
},{
    timestamps:true
});

const User = mongoose.model('User',userSchema);
module.exports = User;