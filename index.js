const express = require("express")
const { connection } = require("./connection/db")
const { userRouter } = require("./Routes/user.Routes")
const { bookRouter } = require("./Routes/book.Router")
const { Relater } = require("./middleware/UsertoBookRelater")
const { orderRouter } = require("./Routes/order.Router")
const app = express()
app.use(express.json())
app.use("/",userRouter)
app.use(Relater)
app.use("/books",bookRouter)
app.use("/",orderRouter)
app.listen(4800,async(req,res)=>{
    try{
        await connection
        console.log("Your server is running on Port 4800")
    }catch(err){
        console.log(err.massage)
    }
})