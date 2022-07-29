//? DEPENDENCIES

const express = require("express");
const Product = require("../models/products");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();

//? ROUTES

router.get("/seed", async (req, res) => {
  try {
    await Product.deleteMany({});
    const testProducts = await Product.create([
      {
        name: "zenyum toothbrush",
        description: "teal colour",
        image: "https://www.zenyum.com/img/sonic/head-faq-pastel.jpg",
        category: "dentalcare",
        price: 89,
        quantity: 9,
         sku: 23,
         seller:"lolol"

      },
      {
        name: "kinderbueno",
        description: "30 x 2 bars",
        image:
          "https://www.kinder.com/eg/sites/kinder_eg/files/2019-11/snack-chocolate-bar-kinder-bueno-gamma-3_1.png?t=1623490890",
        category: "food",
        price: 50,
        quantity: 15,
          sku: 35,
          seller:"lolol2"
      },
      {
        name: "guinness draught beer",
        description: "30 x 2 bars",
        image:
          "https://m.media-amazon.com/images/I/719DpQ-StJL._AC_SX679_.jpg",
        category:  "drinks",
        price: 70,
        quantity: 10,
          sku: 88,
          seller:"lolol3"
      },
      {
        name: "zenyum toothbrush",
        description: "teal colour",
        image: "https://www.zenyum.com/img/sonic/head-faq-pastel.jpg",
        category: "dentalcare",
        price: 89,
        quantity: 9,
         sku: 23,
         seller:"lolol4"
      },
      {
        name: "kinderbueno",
        description: "30 x 2 bars",
        image:
          "https://www.kinder.com/eg/sites/kinder_eg/files/2019-11/snack-chocolate-bar-kinder-bueno-gamma-3_1.png?t=1623490890",
        category: "food",
        price: 50,
        quantity: 15,
          sku: 35,
          seller:"lolol5"
      },
      {
        name: "guinness draught beer",
        description: "30 x 2 bars",
        image:
          "https://m.media-amazon.com/images/I/719DpQ-StJL._AC_SX679_.jpg",
        category:  "drinks",
        price: 70,
        quantity: 10,
          sku: 88,
          seller:"lolol6"
      },
    ]);
    res.status(StatusCodes.OK).send(testProducts);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
  // res.send("seed")
});

router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(StatusCodes.OK).send({ status: "success", data: product });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
});


router.post("/new", async (req, res) => {
  console.log("req.body",req.body);
  try {
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).send({ status: "success", data: product });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
});



module.exports = router;
