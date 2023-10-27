const User = require("../models/users");

const createUser = async (req, res) => {
  try {
    const username = req.body.username;
    const newUser = new User({ username });
    const savedUser = await newUser.save();
    const { _id } = savedUser;
    res.status(201).json({ _id, username });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("username _id");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUsers,
  createUser,
};
