const db = require("../data/dbConfig.js");
const server = require("./server");
const request = require("supertest");
const { buildToken } = require('../api/auth/auth-middleware')
const Jokes = require('../api/jokes/jokes-data')


beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
  });

afterAll(async () => {
  await db.destroy();
  });

describe("auth Endpoints", () => {

  describe("[POST] /register", () => {
   
    it('rejects when posting with invalid credentials ', async () => {
      const res = await request(server)
      .post('/api/auth/register').send({})
      expect(res.body.message).toMatch(/username and password required/i)
    })

    it('inserts a new user and returns the newly created user', async() => {
      const newUser = {username:'admin', password:"password"}
      const res = await request(server)
      .post('/api/auth/register').send(newUser)
      expect(res.body).toMatchObject({id:1, username:'admin'})
    })

  });

  describe("[POST] /login", () => {
     
    it('rejects when incorrect username and password are sent', async() => {
      const newUser = {username:'notAdmin', password:"notPassword"}
      const res = await request(server)
      .post('/api/auth/login').send(newUser)
      expect(res.body.message).toMatch(/invalid credentials/i)
    }) 
    it('responds with correct message when login is successful', async() => {
      const newUser = {username:'admin', password:"password"}
      const res = await request(server)
      .post('/api/auth/login').send(newUser)
      expect(res.body.message).toMatch(/welcome, admin/i)
    }) 
  });
});

describe("jokes Endpoints", () => {
  describe("[GET] /", () => {
    it("denies access with no token", async () => {
      const res = await request(server).get("/api/jokes");
      expect(res.body.message).toMatch(/token required/i);
    });
    it("returns all joke with valid token", async () => {
      const newUser = {username:'admin', password:"password"}
      const res = await request(server).get("/api/jokes").set('Authorization', buildToken(newUser));
      expect(res.body).toEqual(Jokes);
    });
  });
});
