const express = require("express");

const { getLogs } = require("../../controllers/users/logs");

const router = express.Router();

router.get("/users/:_id/logs", getLogs);

module.exports = router;
