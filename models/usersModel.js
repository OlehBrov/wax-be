const { Schema, model } = require("mongoose");
const procedure = require("./proceduresModel");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  roles: {
    type: Array,
    default: ["user"],
  },
  apiKey: {
    type: String,
  },
  profile: {
    dob: { type: String },
    name: { type: String },
    about: { type: String },
    address: { type: String },
    company: { type: String },
  },
  username: { type: String },
  createdAt: {
    type: Date,
    default: "",
  },
  updatedAt: {
    type: Date,
    default: "",
  },
  token: {
    type: String,
    default: "",
  },
  currentOrders: [
    {
      date: { type: String },
      time: { type: String },
      orders: [
        {
          type: Schema.Types.ObjectId,
          ref: "procedure",
          default: [],
        },
      ],
    },
  ],
  pastOrders: [
    {
      type: Schema.Types.ObjectId,
      ref: "procedure",
      default: [],
    },
  ],
});

module.exports = model("user", userSchema);

/*
[{date: 01/01/0101, orders: [{}, {}]}]
*/
