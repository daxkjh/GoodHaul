const mongoose=require('mongoose');

const buyerSchema=mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String, required:true},
    emailAddress:{type:String},
    address:{type:String},
    wishlists: {type:Array},
    groups: {type:Array},
    history: {type:Array}

    //to be added on....
});

module.exports = mongoose.model("Buyer",buyerSchema);