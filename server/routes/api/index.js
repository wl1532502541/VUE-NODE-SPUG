module.exports = app =>{
    const express = require("express")
    const router = express.Router()

    // 登陆验证中间件
    const auth = require("../../middleware/validateMiddleWare")

    // 监听所有通用接口
    app.use('/api/rest/:resource', auth(app), (req,res,next) => {
        const modelName = require('inflection').classify(req.params.resource)
        console.log("api所用model:",modelName)
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)



    // 增 创建
    router.post('/',async(req,res) => {
        try{
            const model = await req.Model.create(req.body)
            console.log(req.body)
            res.send(model)
        }catch(error){
            res.status(400).send({message:'传入的参数有误'})
        }
    })

    // 改 根据_id编辑
    router.put('/:id',async(req,res) => {
        try{
            // 这里的new:true 代表返回更新后的值，它默认很奇葩返回更新前的
            const model = await req.Model.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
            console.log("更新_id:",req.params,"内容:",req.body)
            res.send(model)
        }catch(error){
            res.status(400).send({message:'传入的参数有误'})
        }
    })

    // 删 根据_id删除
    router.delete('/:id',async(req,res) => {
        try{
            const model = await req.Model.findByIdAndDelete(req.params.id)
            console.log("删除_id:",req.params.id)
            res.send(model)
        }catch(error){
            res.status(400).send({message:'传入的参数有误'})
        }
    })

    

    // 查 多数据
    router.get('/',async(req,res) => {
        const total = await req.Model.countDocuments()
        let data = await req.Model.find()
        res.send({
            total,
            data
        })
    })

    // 查 根据id查单数据
    router.get('/:id',async(req,res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    // 获取列表
    // router.get('/',)

    // router.post('/host',async(req,res)=>{
    //     console.log(req)
    //     const model = await Host.create(req.body)
    //     console.log(model)
    //     res.send(model)
    // })

    // app.use('/api',router)
}