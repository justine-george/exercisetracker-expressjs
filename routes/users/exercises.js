const express = require("express");

const { addExercise } = require("../../controllers/users/exercises");

const router = express.Router();

router.post("/users/:_id/exercises", addExercise);

module.exports = router;
