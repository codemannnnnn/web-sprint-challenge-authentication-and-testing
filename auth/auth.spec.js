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
          expect(res.body.data.username).toBe("testing1");
        });
    });
  });
});
