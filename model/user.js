const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = Schema({
    name:{type:String,required:true},
    mobile:{type:Number,unique:true},
    password:{type:String,required:true},
    email:{type:String},
});

module.exports ={
    user:user
}

