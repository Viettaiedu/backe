require('dotenv').config();
const jwt = require('jsonwebtoken');
const verify = (req,res , next) => {
    const token = req.cookies.accessToken;
    // const token2 = req.headers.authorization.split(' ')[1];
    res.json({token1 : "Hello" , token:token});return;
    if(!token) return res.status(404).json({message:"Token is not available"});
   jwt.verify(token , process.env.secret_key , (err,userInfo) => {
      req.userInfo = userInfo;
      next();
   })
}
module.exports = {
    verify
}