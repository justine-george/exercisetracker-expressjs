const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const supertest = require("supertest");
const express = require("express");
const { createUser, getUsers } = require("../../controllers/users");

const app = express();
app.use(express.json());
app.post("/users", createUser);
app.get("/users", getUsers);
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
  test("should create a new user", async () => {
    const res = await request.post("/users").send({ username: "testuser" });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("username", "testuser");
  });

  test("should get all users", async () => {
    const res = await request.get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
