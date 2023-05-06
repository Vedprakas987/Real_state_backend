const mongoose = require("mongoose")
const OrderSchema={
    user :Object,
    books : Object,
    totalAmount: Number
}

const OrderModel=mongoose.model("Orderdata",OrderSchema)
module.exports={
    OrderModel
}