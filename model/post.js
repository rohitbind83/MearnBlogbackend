const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post = Schema({
    title:{type:String},
    user:{type:Object},
    images:{type:String},
    slug:{type:String},
    shortdesc:{type:String},
    description:{type:String},
    views:{type:Number},
    meta_title:{type:String},
    meta_desc:{type:String},
    meta_keyword:{type:String},
    draft:{type:String}
});

module.exports ={
    post:post
}

