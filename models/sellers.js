const mongoose=require('mongoose');

const sellerSchema=mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String, required:true},
    emailAddress:{type:String},
    address:{type:String},
    listings: {type:Array},
    history: {type:Array},
    groups: {type:Array}

    //to be added on....
});

module.exports = mongoose.model("Seller",sellerSchema);