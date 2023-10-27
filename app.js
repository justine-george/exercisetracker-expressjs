require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/users");
const userExerciseRoutes = require("./routes/users/exercises");
const userLogRoutes = require("./routes/users/logs");

app.use((req, res, next) => {
  method = req.method;
  path = req.path;
  ip = req.ip;
  console.log(method + " " + path + " - " + ip);
  next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/ping", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.use("/api", userRoutes);
app.use("/api", userExerciseRoutes);
app.use("/api", userLogRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;
