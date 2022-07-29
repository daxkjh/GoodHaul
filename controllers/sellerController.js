const express = require("express");
const Seller = require("../models/sellers");
const Buyer=require("../models/buyers");
const { StatusCodes } = require("http-status-codes");
const bcrypt=require("bcrypt");
//? config
const router = express.Router();
const saltRounds=bcrypt.genSaltSync(10);

router.get("/seed", async (req, res) => {
  try {
    await Seller.deleteMany({});
    const testSeller = await Seller.create([
      { username: "pauldoe", password: bcrypt.hashSync("password1",saltRounds) },
      { username: "pamydoe", password: bcrypt.hashSync("password2",saltRounds) },
      { username: "pallims", password: bcrypt.hashSync("password3",saltRounds) },
      {username:"admin", password: bcrypt.hashSync("123",saltRounds)}
    ]);
    res.send(testSeller);
  } catch (error) {
    res.send(error);
  }
});

router.get("/", async (req, res) => {
  const sellers = await Seller.find();

  // res.send("TESTTEST");
  res.send({ status: "success", data: sellers });
});

// router.post("/", async (req, res) => {
//   try {
//     const seller = await Seller.create({...req.body,password:bcrypt.hashSync(req.body.password,saltRounds)});
//     res.send({ status: "success", data: seller });
//   } catch (error) {
//     res.send(error);
//   }
// });

router.post('/register', async(req,res)=>{
  const duplicateBuyer= await Buyer.findOne({username:req.body.username});
  const duplicateSeller=await Seller.findOne({username:req.body.username});

  if(!duplicateBuyer&&!duplicateSeller){
    try{
      const newSeller=await Seller.create({...req.body,password:bcrypt.hashSync(req.body.password,saltRounds)});
      res.status(StatusCodes.OK).send({status:"success", data:newSeller});
    }
    catch (error){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
  else {
    res.send("Username already exists, please select another username")
  }
})

router.put("/shipping/:id", async (req, res) => {
  console.log("req.body shipping", req.body)
  const { id } = req.params;
  try { 
    const updateShipping = await Seller.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    )
    res.status(StatusCodes.OK).send({ status: "success", data: updateShipping})
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.message });
  }
})

router.put("/:id", async (req, res) => {
  console.log("req.body sellercontroller", req.body);
  const { id } = req.params;
  // res.send("update count")
  try {
    const updateGroup = await Seller.findByIdAndUpdate(
      id,
      {$push: {listings:req.body}},
      // { $push: {groups: req.body}},
      // { $inc: { likes: 1 } },
      { new: true }
    );
    console.log("update", updateGroup);
    res.status(StatusCodes.OK).send({status:"success", data:updateGroup});
    // res.status(StatusCodes.OK).send({ status: "success", data: updateGroup });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.message });
  }
});


router.get('/:id',async(req,res)=>{
  
  console.log(req.params.id)
  if (!req.session.user){
      console.log("session", req.session);
        res.status(StatusCodes.UNAUTHORIZED).send({status:"fail",data:"No access", id: req.params.id});
    }
    else {
    
    try{
        const { id } = req.params;
        const seller=await Seller.findById(id);
        res.status(StatusCodes.OK).send({status:"success",data:seller});
    }
    catch(error){
        res.send(error);
    }
}
})
router.delete('/:id', async (req,res)=>{
    const {id}=req.params;
    try{
        const deletedSeller=await Buyer.findByIdAndRemove(id);
        res.status(StatusCodes.OK).send({status:"success", data:deletedSeller});
    }
    catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
})


module.exports = router;
