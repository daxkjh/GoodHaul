// Dependencies
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const debug = require("debug");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt=require('bcrypt');
const saltRounds=bcrypt.genSaltSync(10);
const { StatusCodes } = require("http-status-codes")
// const {  } = require("process");
// const Product = require("./models/products.js");


const Buyer=require("./models/buyers");
const Seller=require("./models/sellers");


const productController = require("./controllers/productController")
const preferenceController = require("./controllers/preferenceController")
const listingController = require("./controllers/listingController")

const buyerController=require('./controllers/buyerController');
const sellerController=require('./controllers/sellerController');


const app = express();
const port = process.env.PORT || 3000;
const log = debug("goodhaul:server");
// Global configuration
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/goodhaul";
const db = mongoose.connection;

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("the connection with mongod is established");
  }
);

// Connection Error/Success
// Define callback functions for various events
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", mongoURI));
db.on("disconnected", () => console.log("mongo disconnected"));

app.use(morgan("dev"));
// app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);
app.use(express.static("./frontend/dist"));
app.use("/api/products", productController);
app.use("/api/preferences", preferenceController);
app.use("/api/listings", listingController);
app.use('/api/buyers',buyerController);
app.use('/api/sellers',sellerController);


app.get("/api/", (req, res) => {
  res.send("HelloWorld")
})

app.put('/api/passwordchange', async(req,res)=>{
  console.log("req.body",req.body);
  console.log("req.session.user",req.session.user);
  if (!req.session.user){
      res.status(StatusCodes.UNAUTHORIZED).send({status:"fail",data:"No access"});
  }
  else {
  
  try{
    if (req.body.status==="seller"){
      const seller=await Seller.findOneAndUpdate({username:req.session.user}, {password:bcrypt.hashSync(req.body.newPassword,saltRounds)});
      res.status(StatusCodes.OK).send({status:"success",data:seller});
    }
     else if(req.body.status==="buyer"){
      const buyer=await Buyer.findOneAndUpdate({username:req.session.user}, {password:bcrypt.hashSync(req.body.newPassword,saltRounds)});
      res.status(StatusCodes.OK).send({status:"success",data:buyer});
    }
  }
  catch(error){
      res.send(error);
  }
}  
// console.log(req.body);
// const testSession="admin"
// if (!testSession){
//     res.status(StatusCodes.UNAUTHORIZED).send({status:"fail",data:"No access"});
// }
// else {

// try{
//   if (req.body.status==="seller"){
//     console.log("seller loop");
//     const seller=await Seller.findOneAndUpdate({username:testSession}, {password:bcrypt.hashSync(req.body.newPassword,saltRounds)});
//     res.status(StatusCodes.OK).send({status:"success",data:seller});
//   }
//    else if(req.body.status==="buyer"){
//     console.log("buyer loop");
//     console.log("test session", testSession);
//     const buyer=await Buyer.findOneAndUpdate({username: testSession}, {password: bcrypt.hashSync(req.body.newPassword, saltRounds)});
//     console.log(buyer)
//     res.status(StatusCodes.OK).send({status:"success",data:buyer});
//   }
// }
// catch(error){
//     res.send(error);
// }
// }
})


app.post('/api/login', async(req,res)=>{
  console.log(req.body);
  const {username,password,accountType} = req.body;
  // console.log("username",username);
  // console.log("accoutntype",accountType);
  // console.log("password",password);
 
  try{
    if(accountType==="Buyer"){
      const buyer= await Buyer.findOne({username:username})
      if(bcrypt.compareSync(password,buyer.password)){
        req.session.user=username;
        res.send({ status: "login success", data:{buyer}});
      }
      else{
        res.send("login failed");
      }
    }
    else if(accountType==="Seller"){
      const seller= await Seller.findOne({username:username})
      if(bcrypt.compareSync(password,seller.password)){
        req.session.user=username;
        res.send({ status: "login success", data:{seller}});
      }
      else{
        res.send("login failed");
      }
    }
  console.log(req.session.user);
  }
  catch(error){
    res.send({status:"error"})
  }
})

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./frontend/dist/index.html"))
})

app.listen(port, () => {
    console.log("heheh im listening @ port", port)
})