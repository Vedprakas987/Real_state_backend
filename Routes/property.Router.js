const express = require("express")
const jwt = require("jsonwebtoken")
const { PropertyModel } = require("../Model/Property.model")
const PropertyRouter = express.Router()
// proer.post('/',retailer,controller)
PropertyRouter.post("/",async(req,res)=>{
    let payload=req.body
    // console.log(payload)
    payload.price= Number(payload.price)
    try{
        const new_book = new PropertyModel(payload)
      const isSave= await new_book.save()
    //   console.log(isSave)
       res.send({"msg":"new book is posted"})
    }catch(err){
        // console.log(err)
        res.send({"msg":"something went wrong","error":err.massage})
    }
}
)

    // 
    PropertyRouter.get("/myprofile", async (req, res) => {
        const token =  req?.headers?.authorization?.split(' ')[1]
            const { userId } = jwt.verify(token, "ved");
         
      
           let query = { userid: userId };
      
           if (req.query) {
          query = { ...query, ...req.query };
           }
      
        try {
          const data = await PropertyModel.find(query);
          console.log(data,query)
          res.send(data);
        } catch (err) {
        //   console.log({ msg: err.message });
        }
      });
      
  




PropertyRouter.get("/:id",async(req,res)=>{
    let x = req.params.id
    // console.log(x)
    const token = req?.headers?.authorization?.split(' ')[1]
    // console.log('tok',token)
    const {userid} = jwt.verify(token,"ved")
    try{
        const data = await PropertyModel.find({_id:x})
        res.send(data)
    }catch(err){
        // console.log({"msg":err.massage})
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