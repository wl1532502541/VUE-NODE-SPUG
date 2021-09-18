module.exports = app =>{
    const express = require("express")
    const router = express.Router()
    const Host = require('../models/Host')
    router.post('/host',async(req,res)=>{
        console.log(req)
        const model = await Host.create(req.body)
        console.log(model)
        res.send(model)
    })

    app.use('/api',router)
}