const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // id:{type:Number},
    name:{type:String},
    password:{type:String},
    nickName:{type:String}
})

module.exports = mongoose.model('Account',schema)