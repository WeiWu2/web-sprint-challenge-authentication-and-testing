const Auth = require("./auth-model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secrets");


const validBody = (req,res,next) => {
    //check for username and password existing in req.body
    const { username, password } = req.body;
    if (!username || !password)
      res.status(400).json({ message: "username and password required" });
    else
    next()
}
const validUsername = (req, res, next) => {
    Auth.findByName(req.body.username)
      .then((user) => {
        //check if username is taken
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
