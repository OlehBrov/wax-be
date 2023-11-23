const jwt = require("jsonwebtoken");
const { httpError } = require("../helpers");
const User = require("../models/usersModel");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const adminRoleCheck = async (req, res, next) => {
  const { roles } = req.user;
  console.log('req.user', req.user)
  if (roles === "admin") {
    next()
  } else res.json({ message: "You are not allowed to be here" });
};

module.exports = adminRoleCheck