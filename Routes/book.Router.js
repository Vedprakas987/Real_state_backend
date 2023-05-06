const express = require("express")
const { BookModel } = require("../Model/book.model")
const jwt = require("jsonwebtoken")
const bookRouter = express.Router()
bookRouter.post("/",async(req,res)=>{
    const payload_book=req.body
    try{
        const new_book = new BookModel(payload_book)
       await new_book.save()
       res.send({"msg":"new book is posted"})
    }catch(err){
        res.send({"msg":"something went wrong"})
    }
}
)

bookRouter.get("/",async(req,res)=>{
    if(req.query.category!==undefined){
        const token = req.headers.authorization
        const {userid} = jwt.verify(token,"ved")
        console.log(req.query)
        try{
            const data = await BookModel.find(req.query)
            res.send(data)
        }catch(err){
            console.log({"msg":err.massage})
        }
    }else{
        const token = req.headers.authorization
        const {userid} = jwt.verify(token,"ved")
        try{
            const data = await BookModel.find({userid:userid})
            res.send(data)
        }catch(err){
            console.log({"msg":err.massage})
        }
    }
  
})



bookRouter.get("/:id",async(req,res)=>{
    let x = req.params.id
    console.log(x)
    const token = req.headers.authorization
    const {userid} = jwt.verify(token,"ved")
    try{
        const data = await BookModel.find({_id:x})
        res.send(data)
    }catch(err){
        console.log({"msg":err.massage})
    }
})
bookRouter.delete("/:id",async(req,res)=>{
    const {id} = req.params
    try{
        await BookModel.findByIdAndDelete({_id:id})
        res.send({"msg":"Book is deleted"})
    }catch{
        res.send({"msg":"something went wrong"})
    }
})

bookRouter.patch("/:id",async(req,res)=>{
    const {id} = req.params
    const payload= req.body
    try{
        await BookModel.findByIdAndUpdate({_id:id},payload)
        res.send({"msg":"Book is Updated"})
    }catch{
        res.send({"msg":"something went wrong"})
    }
})
module.exports={
    bookRouter
}