module.exports = app => {
  const router = require("express").Router()
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  let User = require('./models').User
  const History = require('./models').History
  // 登陆验证中间件
  const auth = require("../../../middleware/validateMiddleWare")
  

  // 不用登陆验证
  app.post('/api/account/login',async(req,res)=>{
      const { username, password } = req.body
      assert((username || password), 422, '请输入用户名和密码')

      // 1.查询用户名是否存在
      const user = await User.findOne({username}).select('+password_hash')
      assert(user, 422, '用户名不存在')

      // 2.校验密码
      const isValid = require('bcryptjs').compareSync(password,user.password_hash)
      assert(isValid, 422, '密码错误')

      // 3.返回token
      const token = jwt.sign({ id: user._id},app.get('secret'))
      console.log(req.ip)
      History.create({user:user.id,ip:req.ip})

      res.send({
          message: '登陆成功',
          token,
          nickname: user.nickname
      })
  })
  

  // 需要登陆验证
  app.use('/api/account', auth(app),router)


  // login->history
  router.get('/login/history', async(req,res) => {
    const histories = await History.find().populate({path:'user',select:'nickname'})
    console.log(histories)
    res.send(histories)
  })

  // user
  router.get('/user', async(req, res) => {
    // const users = User.find({is_super:false}).populate('role')
    const users = await User.find({is_super:false})
    res.send(users)
  })

  router.patch('/user',async(req,res) => {
    try{
      arr = ["_id","username","nickname","is_super","is_active","role"]
      const form = {}
      Object.keys(req.body).filter((key)=>arr.includes(key)).forEach((key)=>{
        form[key]=req.body[key]
      })
      if(!("_id" in form)){
        return res.status(400).send("请指定对象")
      }
      if("username" in form){
        let user = await User.find({username:form.username})
        if(user.length)return res.status(400).send(`已存在登录名为【${form.username}】的用户`)
      }
      const _id = form._id
      delete form._id
      const user = await User.findOneAndUpdate({_id:_id},form,{new:true})
      res.send(user)
    }catch(error){
      res.status(400).send(error)
    }
  })


  // role
}