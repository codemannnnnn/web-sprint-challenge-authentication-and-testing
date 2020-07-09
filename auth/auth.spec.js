const supertest = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

afterEach(async () => {
  await db("users").truncate();
});

describe("auth", () => {
  it("can run the tests", () => {
    expect(true).toBeTruthy();
  });
  describe("post /register", () => {
    it("should return a status code of 201", () => {
      return supertest(server)
        .post("/api/auth/register")
        .send({
          username: "testing",
          password: "password",
        })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
    it("should return the newly created username", () => {
      return supertest(server)
        .post("/api/auth/register")
        .send({
          username: "testing1",
          password: "password",
        })
        .then((res) => {
          expect(res.body.creds.username).toBe("testing1");
        });
    });
  });
  describe("post /login", () => {
    beforeEach(async () => {
      await supertest(server).post("/api/auth/register").send({
        username: "login",
        password: "test",
      });
    });
    it("should return a status code of 200", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send({
          username: "login",
          password: "test",
        })
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should return successful login", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send({
          username: "login",
          password: "test",
        })
        .then((res) => {
          expect(res.body.message).toBe("Welcome to our API");
        });
    });
  });
});
