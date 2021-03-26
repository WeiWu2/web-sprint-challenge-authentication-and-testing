const Auth = require("./auth-model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secrets");

//check for username and password existing in req.body
const validBody = (req,res,next) => {
    const { username, password } = req.body;
    if (!username || !password)
      res.status(400).json({ message: "username and password required" });
    else
    next()
}

 //check if username is taken
const validUsername = (req, res, next) => {
    Auth.findByName(req.body.username)
      .then((user) => {

        if (user) 
        res.status(400).json({ message: "username taken" });
        else 
        next();
      })
      .catch(next);

};

//builds JWToken
const buildToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
  };
  const config = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, jwtSecret, config);
};

module.exports = {
  validUsername,
  buildToken,
  validBody
};
