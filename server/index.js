const express = require("express")

const app = express()

app.set('secret','wanglei')

// 跨域
app.use(require('cors')())
// 把请求体转换成json对象
app.use(express.json())
// 连接数据库
require('./plugins/db')(app)
// 登陆接口
require('./routes/api/login')(app)
// 后台管理 crud 接口
require('./routes/api')(app)
// ws ssh接口
require('./routes/ssh')(app)


// 监听服务器其他错误
app.use((err,req,res,next) => {

    if (!err.statusCode) return res.status(500).send({ message: err.message })

    res.status(err.statusCode).send({
        message: err.message
    })
    
})

app.listen(3000,()=>{
    console.log('http://localhost:3000')
})