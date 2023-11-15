const jwt = require("jsonwebtoken");
const { httpError } = require("../helpers");
const User = require("../models/usersModel");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" && !token) {
    next(httpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token) {
      console.log("!user || !user.token");
      next(httpError(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch {
    console.log("authenticate catch");
    next(httpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
