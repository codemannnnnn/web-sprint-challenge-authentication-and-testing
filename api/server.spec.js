const supertest = require("supertest");
const server = require("./server.js");
const db = require("../database/dbConfig.js");

describe("server.js", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  describe("GET /", () => {
    it("should return status code 200 ok", () => {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should return api up", () => {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.body.api).toBe("up");
        });
    });
  });
});
