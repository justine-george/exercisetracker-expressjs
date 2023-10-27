const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
