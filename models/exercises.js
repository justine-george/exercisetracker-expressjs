const mongoose = require("mongoose");

const schema = mongoose.Schema;

const exerciseSchema = new schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    duration: {
      type: Number,
      required: true,
      trim: true,
      minlength: 1,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
      minlength: 1,
    },
  },
  {
    timestamps: true,
  },
  { collection: "exercises" }
);

module.exports = mongoose.model("Exercise", exerciseSchema);
