require("dotenv").config();
const jwt = require("jsonwebtoken");
const verify = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.secret_key);
    req.userInfo = decodedToken;
    return next();
  } catch (err) {
    res.status(500).json({
      message: "Authentication field",
      error: err,
    });
  }
 
};
module.exports = {
  verify,
};
