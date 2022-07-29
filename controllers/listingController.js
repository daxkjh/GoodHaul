//? DEPENDENCIES

const express = require("express");
const Listing = require("../models/listings");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();

//? ROUTES

router.get("/seed", async (req, res) => {
  try {
    await Listing.deleteMany({});
    const testListing = await Listing.create([
      {
        // mongo DB
        sellerId: "12345",
        name: "shin ramyeon",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Skittles-Louisiana-2003.jpg/440px-Skittles-Louisiana-2003.jpg",
        price: 15,
        quantity: 15,
        category: ["maggi", "food"],
        buyerList: [],
        sku:30,
        date: new Date(),
        endDate: new Date().setSeconds(new Date().getSeconds() + 10)
      },
    ]);
    res.status(StatusCodes.OK).send({ status: "success", data: testListing})
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
  // res.send("seed")
});

router.post("/new", async (req, res) => {
      try {
        const listing = await Listing.create(req.body);
        res
          .status(StatusCodes.CREATED)
          .send({ status: "success", data: listing });
      } catch (error) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: error.message });
      }
})

router.get("/", async (req, res) => {
  try {
    const listing = await Listing.find();
    res.status(StatusCodes.OK).send({ status: "success", data: listing });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
});
router.get("/popular", async (req,res)=>{
  try{
  const popularListings= await Listing.find().sort({quantity:-1}).limit(5);
  res.send(popularListings);
  }
  catch(error){
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: error.message });
  }
})
router.get("/:id",async (req,res)=>{
  try{
    const listing =await Listing.findById(req.params.id);
    res.status(StatusCodes.OK).send({ status: "success", data: listing});

  } catch (error) {
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: error.message });
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updateListing = await Listing.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(StatusCodes.OK).send({ status: "success", data: updateListing });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  // res.send("delete")
  try {
    const deletedListing = await Listing.findByIdAndRemove(id);
    res.status(StatusCodes.OK).send(deletedListing);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
});


module.exports = router;
