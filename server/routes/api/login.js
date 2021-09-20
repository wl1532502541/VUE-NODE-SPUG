module.exports = app => {
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const Account = require('../../models/Account')

    app.post('/api/login',async(req,res)=>{
        const { username, password } = req.body
        assert((username || password), 422, '请输入用户名和密码')

        // 1.查询用户名是否存在
        const user = await Account.findOne({username}).select('+password')
        assert(user, 422, '用户名不存在')

        // 2.校验密码
        const isValid = require('bcryptjs').compareSync(password,user.password)
        assert(isValid, 422, '密码错误')

        // 3.返回token
        const token = jwt.sign({ id: user._id},app.get('secret'))
        res.send({
            message: '登陆成功',
            token
        })
    })
}