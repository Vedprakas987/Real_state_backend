const mongoose = require("mongoose")
const OrderSchema={
    user :Object,
    books : Object,
    totalAmount: Number
}

const OrderModel=mongoose.model("orderdatas",OrderSchema)
module.exports={
    OrderModel
}