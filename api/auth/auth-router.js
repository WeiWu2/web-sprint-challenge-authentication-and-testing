const bcryptjs = require("bcryptjs");
const router = require("express").Router();
const authMiddleware = require("./auth-middleware");
const Auth = require("./auth-model");


router.post("/register", authMiddleware.validUsername, (req, res, next) => {
  const { username, password } = req.body;
  const credentials = { username, password };
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcryptjs.hashSync(password, rounds);
  credentials.password = hash;
  Auth.add(credentials)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.post("/login", (req, res, next) => {
  res.end("implement login, please!");
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
  next();
});

//error handling
router.use((error, req, res, next) => {
  //eslint-disable-line
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
});
module.exports = router;
