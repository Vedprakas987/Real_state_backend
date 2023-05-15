const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  image: String,
  location: String,
  price: Number,
  contactNumber: String,
  area: String,
  userid:String,
});

const PropertyModel = mongoose.model("properties", PropertySchema);

module.exports = {

  PropertyModel
};
