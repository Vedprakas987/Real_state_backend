const express = require("express")
const { OrderModel } = require("../Model/order.model")
const { Relater } = require("../middleware/UsertoBookRelater")
const orderRouter = express.Router()
orderRouter.use(express.json())
orderRouter.use(Relater)
orderRouter.post("/order",async(req,res)=>{
    const payload = req.body
try{
    const new_book_order = new OrderModel(payload)
    await new_book_order.save()
    res.send({"msg":"new order is placed"})
}catch(err){
    console.log(err.message)
}
})

orderRouter.get("/orders",async(req,res)=>{
    try{
        const data = await OrderModel.find()
        res.send(data)
    }catch(err){
        console.log({"msg":err.massage})
    }
})

module.exports={
    orderRouter
}