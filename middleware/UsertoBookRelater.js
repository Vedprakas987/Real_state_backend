const jwt = require("jsonwebtoken")
const Relater=(req,res,next)=>{
    const token = req.headers.authorization
    console.log(token)
    if(token){
        const decoded = jwt.verify(token,"ved")
        req.body.userid=decoded.userid
        next()
    }
}

module.exports={
    Relater
}