const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const preferencesSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number},
  sku: { type: Number },
  buyerList: {type: Array},
  seller: {type: String, default: ""},
  fulfilled: {type: Boolean},
  dateListed: {type: Date}, 
  dateExpiry:{type: Date}
});
const Preference = mongoose.model("Preference", preferencesSchema);

module.exports = Preference;

  
  // sku: { type: Number },
   