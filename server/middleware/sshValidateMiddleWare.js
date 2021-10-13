module.exports = (app) => {
    return async (ws,req,next) => {
        console.log('req',req._parsedUrl.query.slice(6))
        const assert = require('http-assert')
        
        const token = req._parsedUrl.query.slice(6)
        console.log('ws token:',token)
        assert(token, 401, '请提供jwt token')

        const {id} = require('jsonwebtoken').verify(token, app.get('secret'))
        assert(id, 401, '无效的jwt token')

        req.user = await require('../models/Account').findById(id)
        assert(req.user, 401, '用户不存在')

        next()
    }
}