//? DEPENDENCIESS

const express = require("express");
const Preference = require("../models/preferences");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();

//? ROUTES

router.get("/seed", async (req, res) => {
  try {
    await Preference.deleteMany({});
    const preference = await Preference.create([
      {
        name: "Zenyum toothbrush",
        description: "teal colour, pack of 5",
        image: "https://www.zenyum.com/img/sonic/head-faq-pastel.jpg",
        category: "dentalcare",
        price: 89,
        // quantity: 9,
        sku: 23,
      //   buyerList: [{buyer:"62b3d9f698baa96b16c5c653",
      // quantity: 4}],
        // dateListed: new Date(),
        // dateExpiry: new Date().setMinutes(new Date().getMinutes() + 10),
      },
      {
        name: "Kinder Bueno",
        description: "1 carton, 30 x 2 bars",
        image:
          "https://www.kinder.com/eg/sites/kinder_eg/files/2019-11/snack-chocolate-bar-kinder-bueno-gamma-3_1.png?t=1623490890",
        category: "food",
        price: 50,
        // quantity: 15,
        sku: 35,
        // dateListed: new Date(),
        // dateExpiry: new Date().setMinutes(new Date().getMinutes() + 10),
      },
      {
        name: "guinness draught beer",
        description: "30 x 2 bars",
        image: "https://m.media-amazon.com/images/I/719DpQ-StJL._AC_SX679_.jpg",
        category: "drinks",
        price: 70,
        // quantity: 10,
        sku: 88,
        // dateListed: new Date(),
        // dateExpiry: new Date().setSeconds(new Date().getSeconds() + 10),
      },
      {
        name: "Apple 13 inch MacBook Air Laptop",
        description: " Apple M1 chip with 8 core CPU, 8GB RAM, 2020 Model GOLD COLOR",
        image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/refurb-macbook-air-gold-m1-202010_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1634148580000",
        category: "electronics",
        price: 1100,
        // quantity: 10,
        sku: 88,
        // dateListed: new Date(),
        // dateExpiry: new Date().setSeconds(new Date().getSeconds() + 10),
      },
      {
        name: "Samsung S22 Ultra 5G ",
        description: "512GB Bronze Color, Brand New In Box, 1 Year Warranty",
        image: "https://images.samsung.com/sg/smartphones/galaxy-s22-ultra/buy/S22_Ultra_ProductKV_Burgundy_MO.jpg",
        category: "electronics",
        price: 990,
        // quantity: 10,
        sku: 88,
        // dateListed: new Date(),
        // dateExpiry: new Date().setSeconds(new Date().getSeconds() + 10),
      },
      {
        name: "Custom PC",
        description: "4TB SSD, Intel I9-12th Gen, Nvidia RTX 3090TI, FOR HOMEWORK AND PROJECT",
        image: "https://www.aftershockpc.com/backend/public/data/images/thumbs/1_Zeal.png",
        category: "electronics",
        price: 2599,
        // quantity: 10,
        sku: 88,
        // dateListed: new Date(),
        // dateExpiry: new Date().setSeconds(new Date().getSeconds() + 10),
      },
      {
        name: "Philips Lightbulb",
        description: "Warm E27, 1000 lumens, Bulk purchase for company",
        image: "https://www.zener.com.sg/v2/wp-content/uploads/2020/04/Philips-Essential-E27-18W-Bulb.jpg",
        category: "electronics",
        price: 2.50,
        // quantity: 10,
        sku: 88,
        // dateListed: new Date(),
        // dateExpiry: new Date().setSeconds(new Date().getSeconds() + 10),
      },
      {
        name: "LG AI Direct Drive FV1450S2K Washing Machine",
        description: "10.5kg, FrontLoading, Local Warranty",
        image: "https://hnsgsfp.imgix.net/4/images/detailed/53/LG_Washer_2_(Main).JPG?fit=fill&bg=0FFF&w=1536&h=900&auto=format,compress",
        category: "appliances",
        price: 499,
        // quantity: 10,
        sku: 88,
        // dateListed: new Date(),
        // dateExpiry: new Date().setSeconds(new Date().getSeconds() + 10),
      },
      {
        name: "Cornel Electric Oven",
        description: "Turbo Convection, 2000w, self cleaning",
        image: "https://sg.cornellappliances.com/8087-large_default/cornell-25l-air-fryer-oven-with-turbo-convection-function.jpg",
        category: "appliances",
        price: 150,
        // quantity: 10,
        sku: 88,
        // dateListed: new Date(),
        // dateExpiry: new Date().setSeconds(new Date().getSeconds() + 10),
      },
      {
        name: "Nike Free RN 5.0",
        description: "Size 45, Color as per picture, ",
        image: "https://www.podcastorigins.com/images/shoes/nike%20free%20run%20womens-635znd.jpg",
        category: "sports",
        price: 130, 
        // quantity: 10,
        sku: 88,
        // dateListed: new Date(),
        // dateExpiry: new Date().setSeconds(new Date().getSeconds() + 10),
      },
      {
        name: "WILSON Adult Recreational Tennis Rackets",
        description: "	Grip Size 3 - 4 3/8, Aluminium, shaft - Carbon Fibre ",
        image: "https://m.media-amazon.com/images/I/71BpZtPNfTL._AC_SX679_.jpg",
        category: "sports",
        price: 60,
        // quantity: 10,
        sku: 88,
        // dateListed: new Date(),
        // dateExpiry: new Date().setSeconds(new Date().getSeconds() + 10),
      },
      {
        name: "Wilson Prime All Court Tennis Ball",
        description: "USTA and ITF Approved",
        image: "https://m.media-amazon.com/images/I/81Ma5x+dYsL._AC_SX679_.jpg",
        category: "sports",
        price: 60,
        // quantity: 10,
        sku: 88,
        // dateListed: new Date(),
        // dateExpiry: new Date().setSeconds(new Date().getSeconds() + 10),
      },
      {
        name: "Schwinn Koen Boys Bike for Toddlers and Kids",
        description: "Brand: Schwinn, Wheel Size : 	12 Inches, Color: Blue",
        image: "https://m.media-amazon.com/images/I/81kut8UwizL._AC_SX679_.jpg",
        category: "toys",
        price: 260,
        // quantity: 10,
        sku: 88,
        // dateListed: new Date(),
        // dateExpiry: new Date().setSeconds(new Date().getSeconds() + 10),
      },
      {
        name: "A Promised Land",
        description: "HardCover, author: Barack Obama",
        image: "https://images-na.ssl-images-amazon.com/images/I/41VO0mMLRzL._SX327_BO1,204,203,200_.jpg",
        category: "books",
        price: 60,
        // quantity: 10,
        sku: 88,
        // dateListed: new Date(),
        // dateExpiry: new Date().setSeconds(new Date().getSeconds() + 10),
      },
      {
        name: "Huggies Gold New Born Tape Diapers, 78ct",
        description: "Cottony Soft Absorbent Pad - Helps absorb and lock fluid inside, providing up to 12-hour dryness.",
        image: "https://m.media-amazon.com/images/I/81V+ZDsswUL._AC_SX679_.jpg",
        category: "baby",
        price: 78.90,
        // quantity: 10,
        sku: 88,
        // dateListed: new Date(),
        // dateExpiry: new Date().setSeconds(new Date().getSeconds() + 10),
      },
      // {
      //   name: "zenyum toothbrush",
      //   description: "teal colour",
      //   image: "https://www.zenyum.com/img/sonic/head-faq-pastel.jpg",
      //   category: "dentalcare",
      //   price: 89,
      //   quantity: 9,
      //   sku: 23,
      // },
      // {
      //   name: "kinderbueno",
      //   description: "30 x 2 bars",
      //   image:
      //     "https://www.kinder.com/eg/sites/kinder_eg/files/2019-11/snack-chocolate-bar-kinder-bueno-gamma-3_1.png?t=1623490890",
      //   category: "food",
      //   price: 50,
      //   quantity: 15,
      //   sku: 35,
      // },
      // {
      //   name: "guinness draught beer",
      //   description: "30 x 2 bars",
      //   image: "https://m.media-amazon.com/images/I/719DpQ-StJL._AC_SX679_.jpg",
      //   category: "drinks",
      //   price: 70,
      //   quantity: 10,
      //   sku: 88,
      // },
    ]);
    res.status(StatusCodes.OK).send({ status: "success", data: preference });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
});

router.post("/new", async (req, res) => {
  try {
    const highestSKUPreference = await Preference.find()
      .sort({ sku: -1 })
      .limit(1);
    const nextSKU = highestSKUPreference[0].sku + 1;
    console.log(nextSKU);
    const preference = await Preference.create({ ...req.body, sku: nextSKU });
    res
      .status(StatusCodes.CREATED)
      .send({ status: "success", data: preference });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const preference = await Preference.find();
    res.status(StatusCodes.OK).send({ status: "success", data: preference });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
});

router.get("/popular", async (req, res) => {
  try {
    const popularPreferences = await Preference.find()
      .sort({ "quantity": -1 })
      .limit(5);
    res.send(popularPreferences);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const preference = await Preference.findById(req.params.id);
    res.status(StatusCodes.OK).send({ status: "success", data: preference });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
});


router.put("/addtimestamp/:id", async (req, res) => {
  console.log("testesttest",req.body);
  const { id } = req.params;
  try {
    console.log("req.body", req.body);
    const updatePreference = await Preference.findByIdAndUpdate(
      id,
        {...req.body, dateListed: new Date(),
          dateExpiry: new Date().setMinutes(new Date().getMinutes() + 8)},
      // {quantity: req.body.quantity},
      { new: true }
    );
    console.log("herehrhehrheher",updatePreference);
    res
      .status(StatusCodes.OK)
      .send({ status: "success", data: updatePreference });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  console.log("hehrehrhehrhehreererererere", req.body);
  const { id, product } = req.params;
  try {
    console.log("req.body", req.body);
    const updatePreference = await Preference.findByIdAndUpdate(
      id,{...req.body, quantity:req.body.buyerList.reduce((before,after)=>{return before+after.quantity},0)},
      // {quantity: req.body.quantity},
      { new: true }
    );
    res
      .status(StatusCodes.OK)
      .send({ status: "success", data: updatePreference });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.message });
  }
});

router.delete("/", async (req, res) => {
  console.log(req.body);
  try {
    let deletedPreference=[];
    await req.body.map(async (x)=>{
      const deletedProduct = await Preference.remove(x);
    })
    res.status(StatusCodes.OK).send({ status: "success", data: req.body });
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
    const deletedPreference = await Preference.findByIdAndRemove(id);
    res.status(StatusCodes.OK).send(deletedPreference);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
});

// //Show Route
// router.get("/:id", async (req,res)=>{
//   const {id} = req.params;

// try {
// const showPreference = await Preference.findById(id);
// res.status(StatusCodes.OK).send({status: "success", data: showPreference});
// } catch(error){
//   res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
// }

// })

module.exports = router;
