const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  image: String,
  location: String,
  price: Number,
  contactNumber: String,
  area: Number,
  userid:String,
});

const PropertyModel = mongoose.model("Property", PropertySchema);

module.exports = {
  PropertyModel
};
