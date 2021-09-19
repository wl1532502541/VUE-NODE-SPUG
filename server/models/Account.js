const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // id:{type:Number},
    username:{type:String},
    nickname:{type:String},
    password:{
        type:String,
        select:false,
        set(val){
            return require('bcryptjs').hashSync(val,10)
        }
    },
    role: { type:String }

})

module.exports = mongoose.model('Account',schema)