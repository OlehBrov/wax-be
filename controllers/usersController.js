const User = require("../models/usersModel");

const register = (req, res) => {
  const { name, email } = req.body;
};

const getAll = async (req, res) => {
    const allUsers = await User.find();
    res.status(200).json({
    code: 200,
    message: "Success",
    data: allUsers,
  });
};

module.exports = { register, getAll };
