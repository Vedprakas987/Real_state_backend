const express = require("express")
const { PropertyModel } = require("../Model/Property.model")
const jwt = require("jsonwebtoken")
const PropertyRouter = express.Router()
PropertyRouter.post("/",async(req,res)=>{
    const payload=req.body
    try{
        const new_book = new PropertyModel(payload)
       await new_book.save()
       res.send({"msg":"new book is posted"})
    }catch(err){
        res.send({"msg":"something went wrong"})
    }
}
)

    
    PropertyRouter.get("/", async (req, res) => {
        const token = req.headers.authorization;
        const { userid } = jwt.verify(token, "ved");
      
           let query = { userid: userid };
      
           if (req.query) {
          query = { ...query, ...req.query };
           }
      
        try {
          const data = await PropertyModel.find(query);
          res.send(data);
        } catch (err) {
          console.log({ msg: err.message });
        }
      });
      
  




PropertyRouter.get("/:id",async(req,res)=>{
    let x = req.params.id
    console.log(x)
    const token = req.headers.authorization
    const {userid} = jwt.verify(token,"ved")
    try{
        const data = await PropertyModel.find({_id:x})
        res.send(data)
    }catch(err){
        console.log({"msg":err.massage})
    }
})
PropertyRouter.delete("/:id",async(req,res)=>{
    const {id} = req.params
    try{
        await PropertyModel.findByIdAndDelete({_id:id})
        res.send({"msg":"Book is deleted"})
    }catch{
        res.send({"msg":"something went wrong"})
    }
})

PropertyRouter.patch("/:id",async(req,res)=>{
    const {id} = req.params
    const payload= req.body
    try{
        await PropertyModel.findByIdAndUpdate({_id:id},payload)
        res.send({"msg":"Book is Updated"})
    }catch{
        res.send({"msg":"something went wrong"})
    }
})
module.exports={
PropertyRouter
}