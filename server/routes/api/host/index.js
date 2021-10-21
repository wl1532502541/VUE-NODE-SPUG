module.exports = app =>{
    const router = require("express").Router()
    const Host = require('./models').Host

    // 登陆验证中间件
    const auth = require("../../../middleware/validateMiddleWare")
    app.use('/api/host', auth(app),router)

    // 增 创建
    router.post('/',async(req,res) => {
        try{
            const model = await Host.create(req.body)
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
            const model = await Host.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
            console.log("更新_id:",req.params,"内容:",req.body)
            res.send(model)
        }catch(error){
            res.status(400).send({message:'传入的参数有误'})
        }
    })

    // 删 根据_id删除
    router.delete('/:id',async(req,res) => {
        try{
            const model = await Host.findByIdAndDelete(req.params.id)
            console.log("删除_id:",req.params.id)
            res.send(model)
        }catch(error){
            res.status(400).send({message:'传入的参数有误'})
        }
    })

    

    // 查 多数据
    router.get('/',async(req,res) => {
        const total = await Host.countDocuments()
        let data = await Host.find()
        res.send({
            total,
            data
        })
    })

    // 查 根据id查单数据
    router.get('/:id',async(req,res) => {
        const model = await Host.findById(req.params.id)
        res.send(model)
    })
}