const jwt = require("jsonwebtoken");

//model is required if we are saving token into the database

const auth = (req, res, next) => {
  // for safe side if token is coming from or cookie or header
  const token =
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    // according to the problem statement if there is no token then return
    return res.status(403).send("token is missing");
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Returned Token Object ====>>>> ", decode);
    req.user = decode;
    // bring in info from DB
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = auth;
