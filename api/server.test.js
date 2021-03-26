const db = require("../data/dbConfig.js");
const server = require("./server");
const request = require("supertest");



describe("auth Endpoints", () => {
  describe("[POST] /register", () => {
    beforeAll(async () => {
      await db.migrate.latest();
    });
    afterAll(async () => {
      await db.destroy();
    });
    it('works',() => {})
       /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
  });
  describe("[POST] /login", () => {});
});

describe("jokes Endpoints", () => {
  describe("[GET] /", () => {
    it("denies access with no token", async () => {
      const res = await request(server).get("/api/jokes");
      expect(res.body.message).toMatch(/token required/i);
    });
  });
});
