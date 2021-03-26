const bcryptjs = require("bcryptjs");
const router = require("express").Router();
const authMiddleware = require("./auth-middleware");
const Auth = require("./auth-model");


router.post("/register", authMiddleware.validBody,authMiddleware.validUsername, (req, res, next) => {
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

router.post("/login", authMiddleware.validBody, (req, res, next) => {
  Auth.findByName(req.body.username)
  .then((user) => {
    if (user && bcryptjs.compareSync(req.body.password, user.password)) {
      const token = authMiddleware.buildToken(user)
      res.status(200).json({ message: `welcome, ${user.username}`, token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }).catch(next)
});

//error handling
router.use((error, req, res, next) => { //eslint-disable-line
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
});
module.exports = router;
