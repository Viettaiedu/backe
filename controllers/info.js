const db = require("../db");
const getInfo = (req , res )=> {
  const q = "SELECT * FROM info WHERE userId = ?";
  db.query(q , [req.params.userId],(err,data )=> {
    if(err) return res.status(404).json({message:"Error when getting infomation" , error:err});
    res.status(200).json(data[0]);
  })
}
module.exports = {
  getInfo
};
