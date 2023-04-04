const db = require("../db");
const moment = require('moment');

const getNotifications = (req,res) => {
    const q = "SELECT * FROM notifications WHERE userId = ? ORDER BY createdAt DESC";
    db.query(q , [req.userInfo.id] , (err,data) => {
        if(err) return res.status(500).json({message:"Error when getting notifications",error:err});
        res.status(200).json(data);
    })
}

const addNotification = (req,res) => {
  const q = "INSERT INTO notifications(`userId` , `text` ,`senderId` , `createdAt`) VALUES(?)";
  const date = moment().locale('vi').format('YYYY-MM-DD HH:mm:ss');
  db.query(q , [[req.userInfo.id  , req.body.text, req.body.senderId , date]] , (err,data) => {
      if(err) return res.status(500).json({message:"Error when getting notifications",error:err});
      if(data.affectedRows <= 0) return res.status(404).json({message:"Add notification failed"})
      const q = "SELECT * FROM notifications WHERE userId = ?";
      db.query(q , [req.userInfo.id] , (err,data) => {
        if(err) return res.status(500).json({message:"Error when getting new notification",error:err});
        res.status(200).json(data[data.length - 1]);
      })
  })
}
module.exports = {
  getNotifications,
  addNotification
};
