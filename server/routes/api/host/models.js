const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    type:{type:String},     // 类别
    hostname:{type:String}, // 主机名
    username:{type:String}, // 用户名
    ip:{type:String},       // 主机ip
    port:{type:String},     // 主机端口
    pKey:{type:String},
    desc:{type:String},     // 备注
    // created_at:{type:Date}, // 或string
    // created_by_id:{type:Number},
    // deleted_at:{type:Date},
    // deleted_by_id:{type:Number}
})

// module.exports = mongoose.model('Host',schema)
exports.Host = mongoose.model('Host',schema)