// module.exports = (app) => {
//     return async (req,res,next) => {
//         const assert = require('http-assert')
//         // console.log("token:",req.headers.authorization)
//         assert(req.headers.authorization, 401, '请先登录')

//         const token = req.headers.authorization.split(" ").pop()
//         assert(token, 401, '请提供jwt token')

//         const {id} = require('jsonwebtoken').verify(token, app.get('secret'))
//         assert(id, 401, '无效的jwt token')

//         // req.user = await require('../models/Account').findById(id)
//         req.user = await require('../routes/api/account/models').User.findById(id)
//         assert(req.user, 401, '用户不存在')

//         next()
//     }
// }
exports.auth = (app)=>{
    return async (req,res,next) => {
        const assert = require('http-assert')
        // console.log("token:",req.headers.authorization)
        assert(req.headers.authorization, 401, '请先登录')

        const token = req.headers.authorization.split(" ").pop()
        assert(token, 401, '请提供jwt token')

        // try{
        //     var {id} = require('jsonwebtoken').verify(token, app.get('secret'))
        // }catch(error){
        //     res.status(401).send('jwt无效')
        // }
        const {id} = require('jsonwebtoken').verify(token, app.get('secret'))
        assert(id, 401, '无效的jwt token')

        req.user = await require('../routes/api/account/models').User.findById(id)
        assert(req.user, 401, '用户不存在')

        next()
    }
}
exports.perm = (perm)=>{
    return async (req,res,next) => {
        const assert = require('http-assert')
        if(perm=="admin"){
            assert(req.user.is_super, 401, '无权限')
        }

        next()
    }
}