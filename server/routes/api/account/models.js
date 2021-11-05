const mongoose = require('mongoose')

const User = new mongoose.Schema({
    username: {type:String},
    nickname: {type:String},
    password_hash: {
        type:String,
        select:false,
        set(val){
            return require('bcryptjs').hashSync(val,10)
        }
    },
    is_super: {type:Boolean,default:false},
    is_active: {type:Boolean,default:true},//是否启用
    role: { type:mongoose.Schema.Types.ObjectId , ref:'Role'}
})
exports.User = mongoose.model('User',User)

const Role = new mongoose.Schema({
  name: {type:String},
  desc: {type:String},
  page_perms: {type:String},
  deploy_perms:{type:String},
  host_perms:{type:String}
})
exports.Role = mongoose.model('Role',Role)

const History = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
  ip:{type:String},
  // created_at:{
  //   type:Date,
  //   default:new Date(),
  // }
},
{ timestamps: {createdAt:'created_at'}}// 返回的是 带T Z的0时区时间
)
// History.path('created_at').get((date)=>date.toEast8()) //没起作用

exports.History = mongoose.model('History',History)