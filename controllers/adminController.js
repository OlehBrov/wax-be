const { ctrlWrapper } = require("../helpers");
const User = require("../models/usersModel");
const Procedure = require("../models/proceduresModel");

require("dotenv").config();

const getAllOrders = async (req, res, next) => {
  const orders = await User.aggregate([
    { $project: { currentOrders: 1, email: 1 } },
  ]);
  const ordersList = await User.populate(orders, {
    path: "currentOrders.orders",
    model: Procedure,
  });
  res.json({ data: ordersList });
};

module.exports = { getAllOrders: ctrlWrapper(getAllOrders) };
