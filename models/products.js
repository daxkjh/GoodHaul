const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, min: 0 },
  category: { type: Array, required: true },
  sku: {type: Number},
  //! nt sure how to make the date code
  date: { type: Date },
  seller: {type: String, default: ""},
  buyerList: {type: Array},
  dateListed:{type:Date},
  dateExpiry:{type:Date}

});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
