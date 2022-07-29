const express = require("express");
// const mongoose = require("mongoose");
const Buyer = require("../models/buyers");
const Seller = require("../models/sellers");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
//? config
const router = express.Router();
const saltRounds = bcrypt.genSaltSync(10);

router.get("/seed", async (req, res) => {
  try {
    await Buyer.deleteMany({});
    const testBuyer = await Buyer.create([
      {
        username: "johndoe",
        password: bcrypt.hashSync("password1", saltRounds),
        address: "123 changi",
        emailAddress: "johndoe@gmail.com",
      },
      {
        username: "jimmydoe",
        password: bcrypt.hashSync("password2", saltRounds),
        address: "45 Tuas Link",
        emailAddress: "jimmy_doe@gmail.com",
      },
      {
        username: "jlims",
        password: bcrypt.hashSync("password3", saltRounds),
        address: "blk 554 Choa Chu Kang Ave 12",
        emailAddress: "jlimsone@test.net",
      },
      { username: "admin", password: bcrypt.hashSync("123", saltRounds) },
      {
        username: "wwtest",
        password: bcrypt.hashSync("test", saltRounds),
        address: "80 lele road",
        emailAddress: "1@test.com",
        // wishlists: [
        //   {
        //     name: "maggie mee carton",
        //     _id: 123,
        //     sku: 123,
        //     quantity: 10,
        //     price: 30,
        //     image:
        //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDROXPR8eWFl77g-eNrU9z4DPVuWXsHfq18pkYa4X1Bg&s.jpg",
        //     category: "food",
        //   },
        //   {
        //     name: "hashbrowns carton",
        //     quantity: 25,
        //     _id: 243,
        //     sku: 243,
        //     price: 10,
        //     image:
        //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDROXPR8eWFl77g-eNrU9z4DPVuWXsHfq18pkYa4X1Bg&s.jpg",
        //     category: "food",
        //   },
        // ],
        // history: [
        //   {
        //     name: "mechanical keyboards",
        //     _id: 121,
        //     sku: 121,
        //     image:
        //       "https://m.media-amazon.com/images/I/71y73nqoHqL._AC_SL1500_.jpg",
        //     price: 100,
        //     quantity: 15,
        //     category: "tech",
        //   },
        // ],
      },
    ]);
    res.send(testBuyer);
  } catch (error) {
    res.send(error);
  }
});

router.get("/", async (req, res) => {
  const buyers = await Buyer.find();

  // res.send("TESTTEST");
  res.send({ status: "success", data: buyers });
});

// router.post("/", async (req, res) => {
//   try {
//     const buyer = await Buyer.create({...req.body,password:bcrypt.hashSync(req.body.password,saltRounds)});
//     res.send({ status: "success", data: buyer });
//   } catch (error) {
//     res.send(error);
//   }
// });

router.post("/register", async (req, res) => {
  const duplicateBuyer = await Buyer.findOne({ username: req.body.username });
  const duplicateSeller = await Seller.findOne({ username: req.body.username });

  if (!duplicateBuyer && !duplicateSeller) {
    try {
      const newBuyer = await Buyer.create({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, saltRounds),
      });
      res.status(StatusCodes.OK).send({ status: "success", data: newBuyer });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  } else {
    res.send("Username already exists, please select another username");
  }
});

router.put("/shiftToListed", async (req, res) => {
  console.log("shiftToListed", req.body);
  // res.send("update count")
  try {
    req.body.buyerList.map(async (x) => {
      await Buyer.findByIdAndUpdate(x.buyer, {
        groups: [
          ...Buyer.findById(x.buyer).groups.slice(
            0,
            Buyer.findById(x.buyer).groups.findIndex(
              (x) => x._id === req.body._id
            )
          ),
          req.body,
          ...Buyer.findById(x.buyer).groups.slice(
            Buyer.findById(x.buyer).groups.findIndex(
              (x) => x._id === req.body._id
            ),
            Buyer.findById(x.buyer).groups.findIndex(
              (x) => x._id === req.body._id
            ) + 1
          ),
        ],
      });
    });
    // console.log("update", updateGroup);
    res.status(StatusCodes.OK).send({ status: "success" });
    // res.status(StatusCodes.OK).send({ status: "success", data: updateGroup });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.messaage });
  }
});

router.put("/:id", async (req, res) => {
  console.log("req.body", req.body);
  const { id } = req.params;
  // res.send("update count")
  try {
    const updateGroup = await Buyer.findByIdAndUpdate(
      id,
      req.body,
      // { $push: {groups: req.body}},
      // { $inc: { likes: 1 } },
      { new: true }
    );
    console.log("update", updateGroup);
    res.status(StatusCodes.OK).send({ status: "success", data: updateGroup });
    // res.status(StatusCodes.OK).send({ status: "success", data: updateGroup });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.messaage });
  }
});

router.get("/:id", async (req, res) => {
  if (!req.session.user) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ status: "fail", data: "No access" });
  } else {
    try {
      const { id } = req.params;
      const buyer = await Buyer.findById(id);
      res.status(StatusCodes.OK).send({
        status: "success",
        data: {
          username: buyer.username,
          emailAddress: buyer.emailAddress,
          groups: buyer.groups,
          wishlists: buyer.wishlists,
          history: buyer.history,
        },
      });
    } catch (error) {
      res.send(error);
    }
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBuyer = await Buyer.findByIdAndRemove(id);
    res.status(StatusCodes.OK).send(deletedBuyer);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
});

module.exports = router;
