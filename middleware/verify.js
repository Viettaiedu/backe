require("dotenv").config();
const jwt = require("jsonwebtoken");
const verify = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token , process.env.secret_key);
    req.userData = decodedToken;
    res.json({"token :" : token ,headers : req.headers.authorization})
   return  next();
}catch(err ) {
    res.status(500).json({
        message:"Authentication field",
        error : err
    })
}
// const token = req.cookies.accessToken;
  // if (!token)
  //   return res.status(404).json({ message: "Token is not available" });
  // jwt.verify(token, process.env.secret_key, (err, userInfo) => {
  //   req.userInfo = userInfo;
  //   next();
  // });
};
module.exports = {
  verify,
};
