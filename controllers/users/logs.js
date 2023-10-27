const User = require("../../models/users");
const Exercise = require("../../models/exercises");

const getLogs = async (req, res) => {
  const userId = req.params._id;
  const from = req.query.from ? new Date(req.query.from) : null;
  const to = req.query.to ? new Date(req.query.to) : null;
  const limit = parseInt(req.query.limit);

  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const query = { username: user.username };
  if (from) {
    query.date = { $gte: from };
  }
  if (to) {
    query.date = { ...query.date, $lte: to };
  }

  const exercises = await Exercise.find(query)
    .select("description duration date")
    .limit(limit)
    .exec();

  const count = exercises.length;
  const log = exercises.map((exercise) => {
    return {
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
    };
  });

  return res.status(200).json({
    _id: user._id,
    username: user.username,
    count,
    log,
  });
};

module.exports = {
  getLogs,
};
