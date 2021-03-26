const Auth = require("./auth-model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secrets");

const validUsername = (req, res, next) => {
  const { username, password } = req.body;
  Auth.findByName(username)
    .then((user) => {
      //check for username and password existing in req.body
      if (!username || !password)
        res.status(400).json({ message: "username and password required" });
      //check if username is already in db
      else if (user) 
      res.status(400).json({ message: "username taken" });
      else 
      next();
    })
    .catch(next());
};

const validLogin = (req, res, next) => {
    const { username, password } = req.body;
    Auth.findByName(username)
      .then((user) => {
        //check for username and password existing in req.body
        if (!username || !password)
          res.status(400).json({ message: "username and password required" });
        //check if username is already in db
        else if (user) 
        res.status(400).json({ message: "username taken" });
        else 
        next();
      })
      .catch(next());
  };
  
const buildToken = (user) => {
    const payload = {
      subject: user.id,
      username: user.username,
      role: user.role
    }
    const config = {
      expiresIn: '1d',
    }
    return jwt.sign(
      payload, jwtSecret, config
    )
  }
module.exports = {
  validUsername,
  buildToken,
  validLogin
};
