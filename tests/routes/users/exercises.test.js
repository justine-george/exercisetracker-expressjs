const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const supertest = require("supertest");
const express = require("express");
const { addExercise } = require("../../../controllers/users/exercises");
const { createUser } = require("../../../controllers/users");

const app = express();
app.use(express.json());
app.post("/users", createUser);
app.post("/users/:_id/exercises", addExercise);
const request = supertest(app);

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    dbName: "verifyMASTER",
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
  mongoServer.stop();
});

describe("/api/user", () => {
  let userId;
  test("should create a new user", async () => {
    const res = await request.post("/users").send({ username: "testuser" });
    userId = res.body._id;
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("username", "testuser");
  });

  test("should add a new exercise to this user", async () => {
    const res = await request.post(`/users/${userId}/exercises`).send({
      _id: userId,
      description: "test exercise",
      duration: 60,
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("username", "testuser");
    expect(res.body).toHaveProperty("description", "test exercise");
    expect(res.body).toHaveProperty("duration", 60);
  });
});
