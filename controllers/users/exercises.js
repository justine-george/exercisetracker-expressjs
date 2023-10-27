const User = require("../../models/users");
const Exercise = require("../../models/exercises");

const addExercise = async (req, res) => {
  const userId = req.params._id;
  const description = req.body.description;
  const duration = parseInt(req.body.duration);
  const date = req.body.date ? new Date(req.body.date) : new Date();

  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const newExercise = new Exercise({
    userId: userId,
    username: user.username,
    description,
    duration,
    date,
  });
  const savedExercise = await newExercise.save();

  return res.status(201).json({
    _id: savedExercise.userId,
    username: savedExercise.username,
    description: savedExercise.description,
    duration: savedExercise.duration,
    date: savedExercise.date.toDateString(),
  });
};

module.exports = {
  addExercise,
};
