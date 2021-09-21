module.exports = (app) => {
    return async (req,res,next) => {
        const assert = require('http-assert')
        console.log("token:",req.headers.authorization)
        assert(req.headers.authorization, 401, '请先登录')


        const token = req.headers.authorization
        // assert(req.header)
        next()
    }
}