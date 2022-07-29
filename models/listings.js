const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingsSchema = new Schema({
  sellerId: { type: String },
  name: { type: String, required: true },
  image: { type: String, required: true },
  //? asking price
  price: { type: Number, required: true, min: 0 },
  //? need to keep track of how much each buyer buying
  quantity: { type: Number, required: true, min: 0 },
  category: { type: Array, required: true },
  buyerList: { type: Array },
  sku: { type: Number },
  //! nt sure how to make the date code
  date: { type: Date },
  endDate:{type:Date}
});

const Listing = mongoose.model("Listing", listingsSchema);

module.exports = Listing;
