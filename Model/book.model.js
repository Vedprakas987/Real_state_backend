const mongoose = require("mongoose")
const BookSchema={
    title: String,
    author: String,
    category: String,
    price: Number,
    quantity: Number,
    userid:String
}

const BookModel=mongoose.model("Bookdata",BookSchema)
module.exports={
    BookModel
}