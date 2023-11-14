const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    default: "",
    required: true,
  },
  roles: {
    type: Array,
    default: ['user']
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
});

module.exports = model("user", userSchema);
