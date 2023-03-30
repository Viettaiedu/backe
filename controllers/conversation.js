const db = require("../db");


const getConversations = (req,res) => {
    const q = "SELECT * FROM conversations WHERE userId_1 = ? OR userId_2 = ?";
    db.query(q , [req.userInfo.id,req.userInfo.id] , (err,data) => {
        if(err) return res.status(500).json({message:"Error when getting conversations",error:err});
        res.status(200).json(data);
    })
}
module.exports = {
  getConversations
};
