const db = require("../db");


const getConversations = (req,res) => {
    const q = "SELECT * FROM conversations WHERE userId_1 = ? OR userId_2 = ?";
    db.query(q , [req.userInfo.id,req.userInfo.id] , (err,data) => {
        if(err) return res.status(500).json({message:"Error when getting conversations",error:err});
        res.status(200).json(data);
    })
}

const addConversation = (req,res) => {
  const q = "INSERT INTO conversations (`userId_1` ,`userId_2`) VALUES(?)";
  db.query(q , [[req.userInfo.id , req.query.userId]] , (err,data) => {
      if(err) return res.status(500).json({message:"Error when inserting conversation" , error:err});
      if(data.affectedRows <= 0) return res.status(404).json({message:"Can`t add conversation", error:err});
      const q1 = "SELECT * FROM conversations";
      db.query(q1 , (err,data)=> {
        if(err) return res.status(500).json({message:"Error when inserting conversation" , error:err});
        res.status(200).json(data[data.length - 1])
      })
  })
}
module.exports = {
  getConversations,
  addConversation
};
