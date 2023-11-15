const { ctrlWrapper } = require("../helpers");
const User = require("../models/usersModel");
const Procedure = require("../models/proceduresModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const getOrders = async (req, res) => {
  const { _id } = req.user;
  const orders = await User.findById(_id, "currentOrders").populate({
    path: "currentOrders",
  });

  res.json({
    orders: orders,
  });
};
const postOrders = async (req, res) => {
  const { _id } = req.user;
  const orders = req.body.orders.map((el) => el.id);
  const { date } = req.body;
  const newOrders = await Procedure.find({ _id: { $in: orders } });

  const curOrder = {
    date: new Date(date).toLocaleDateString(),
    time: new Date(date).toLocaleTimeString(),
    orders: newOrders,
  };

  await User.findByIdAndUpdate(_id, { $push: { currentOrders: curOrder } });
  const user = await User.findById(_id).populate({
    path: "currentOrders.orders",
  });
  res.json({
    message: "orders added",
    orders: user.currentOrders,
  });
};

const deleteOrders = async (req, res, next) => {
  const { _id } = req.user;
  const { orderId, procedureId } = req.body;
  // const orders = req.body.orders.map((el) => el.id);
  // const { date } = req.body;
  // const orderDate = new Date(date).toLocaleDateString()
  // console.log("localDate", localDate);
  const oredrsCollection = await User.aggregate([
    { $match: { _id: _id } },
    {
      $project: {
        currentOrders: {
          $filter: {
            input: "$currentOrders",
            as: "order",
            cond: { $eq: ["$$order._id", orderId ] },
          },
        },
      },
    },
  ]);
  console.log(oredrsCollection);
  if (!oredrsCollection) {
    res.json({
      message: "no such",
    });
  } else {
    res.json({
      message: "found",
      data: oredrsCollection,
    });
  }
};

module.exports = {
  getOrders: ctrlWrapper(getOrders),
  postOrders: ctrlWrapper(postOrders),
  deleteOrders: ctrlWrapper(deleteOrders),
};
