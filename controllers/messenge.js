const db = require("../db");
const moment = require('moment');

const getChats = (req,res) => {
    const q = "SELECT distinct senderId , text , conversationId , createdAt FROM messenges WHERE conversationId = ? ";
    db.query(q , [req.params.conversationId] , (err,data) => {
        if(err) return res.status(500).json({message:"Error when getting messenges",error:err});
        res.status(200).json(data);
    })
}
const addChat = (req,res) => {
  const q = "INSERT INTO messenges(`senderId` , `text` ,`conversationId` , `createdAt` ) VALUES(?);";
  const dayNow = moment().locale('vi').format('YYYY-MM-DD HH:mm:ss');
  const values =[req.body.senderId , req.body.text , req.body.conversationId , dayNow];
  db.query(q , [values] , (err,data) => {
      if(err) return res.status(500).json({message:"Error when add chat",error:err});
      if(data.affectedRows <= 0) return res.status(404).json({message:"Insert fail",error:err});
      const q = "SELECT * FROM messenges ORDER BY createdAt DESC";
      db.query(q , (err,data) => {
        if(err) return res.status(500).json({message:"Error when get new chat",error:err});
        res.status(200).json(data[0]);
      })
      
  })
}
module.exports = {
  getChats,
  addChat
};
