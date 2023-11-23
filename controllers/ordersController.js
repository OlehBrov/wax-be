const { ctrlWrapper } = require("../helpers");
const User = require("../models/usersModel");
const Procedure = require("../models/proceduresModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

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
// const updateOrder = async (req, res, next) => {
//   const { _id } = req.user;
//   const { orderId, procedureId, data } = req.body;
// };
const deleteOrder = async (req, res, next) => {
  const { _id } = req.user;
  const { orderId } = req.body;
  const result = await User.findOneAndUpdate(
    { _id },
    { $pull: { currentOrders: {_id: orderId} } },
    { new: true }
  );

  if (!result) {
    res.json({
      message: "ERROR",
    });
  } else {
    res.json({
      message: "Deleted",
      data: result.currentOrders
    });
  }
};
const deleteProcedure = async (req, res, next) => {
  const { _id } = req.user;
  const { orderId, procedureId } = req.body;
  const orderObjectId = new mongoose.Types.ObjectId(orderId);
  const procedureObjectId = new mongoose.Types.ObjectId(procedureId);
      
        //delete procedure via aggregation
  // const oredrsCollection = await User.updateMany([
  //   {
  //     $addFields: {
  //       currentOrders: {
  //         $map: {
  //           input: "$currentOrders",
  //           as: "curOrder",
  //           in: {
  //             $cond: {
  //               if: {
  //                 $eq: ["$$curOrder._id", orderObjectId],
  //               },
  //               then: {
  //                 date: "$$curOrder.date",
  //                 time: "$$curOrder.time",
  //                 _id: "$$curOrder._id",
  //                 orders: {
  //                   $filter: {
  //                     input: "$$curOrder.orders",
  //                     as: "singleOrder",
  //                     cond: { $ne: ["$$singleOrder", procedureObjectId] },
  //                   },
  //                 },
  //               },
  //               else: "$$curOrder",
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },

  // ]);
  const oredrsCollection = await User.findOneAndUpdate(
    {
      _id: _id,
      currentOrders: { $elemMatch: { _id: orderId } },
    },
    {
      $pull: {
        "currentOrders.$.orders": procedureObjectId,
      },
    },

    { new: true }
  );

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
  deleteProcedure: ctrlWrapper(deleteProcedure),
  deleteOrder: ctrlWrapper(deleteOrder),
};
