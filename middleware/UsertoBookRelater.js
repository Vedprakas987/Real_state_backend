const jwt = require("jsonwebtoken")
const Relater=(req,res,next)=>{
    const token = req?.headers?.authorization?.split(' ')[1]
    console.log(token)
    if(token){
        const decoded = jwt.verify(token,"ved")
        req.body.userid=decoded.userId
        console.log(decoded)
        next()
    }
}

module.exports={
    Relater
}