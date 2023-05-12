const express = require("express")
const userRouter=express.Router()
userRouter.use(express.json())
const bcrypt = require("bcrypt")
const jsw = require("jsonwebtoken")
const { userModel } = require("../Model/user.model")
userRouter.get("/",(req,res)=>{
    res.send("welcome to users")
})
userRouter.post("/register",(req,res)=>{
    const {name,email,password,isAdmin} = req.body
    bcrypt.hash(password,3,function(err,hash){
        const user_new =new userModel({name:name,email:email,password:hash,isAdmin:isAdmin})
        user_new.save()
        res.send({"msg":"user has been registered"})
    })
    console.log(req.body)
})
userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    const user = await userModel.find({email})
    if(user){
        bcrypt.compare(password,user[0].password,function(err,result){
            if(result){
                res.send({"msg":"Your are Loged in",token:jsw.sign({"userid":user[0]._id},"ved")})
            }else{
                res.send({"msg":"please fill the correct credentials"})
            }
        })
    }
})
module.exports={
    userRouter
}
