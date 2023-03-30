
const moment = require('moment');
const db = require('../db');
const getUsersRequest = (req,res) => {
    const q = `SELECT u.id , fq.senderUserId , fq.receiverUserId,  u.email , u.firstName , u.lastName , u.profilePic , fq.createdAt FROM friendsRequest AS fq JOIN users AS u ON (u.id = fq.senderUserId) ORDER BY fq.createdAt DESC;`;
    db.query(q  , (err,data) => {
        if(err) return res.status(404).json({message:"Error get friends request" ,error:err});
        res.status(200).json(data);
    })
}
const addFriendsToRequest = (req,res) => {
    const q1 = 'INSERT INTO friendsRequest(`senderUserId`,`receiverUserId` , `createdAt`) VALUES(?);';
    const date = moment().locale('vi').format('YYYY-MM-DD HH:mm:ss');
    const values = [req.userInfo.id , req.body.receiverUserId , date];
    const q2 = "SELECT * FROM friendsRequest WHERE senderUserId  = ? AND receiverUserId = ?";
    db.query(q2,[req.userInfo.id , req.body.receiverUserId ],(err,data) => {
        if(err) return res.status(404).json({message:"Error check friends request" ,error:err});
        if(data.length >= 1 )  return res.status(404).json({message:"have already done" ,error:err});
        db.query(q1, [values] , (err,data) => {
            if(err) return res.status(404).json({message:"Error add friends request" ,error:err});
            if(data.affectedRows <= 0) return res.status(404).json({message:"Error add friends request" ,error:err});
            const q3 = `SELECT u.id , fq.senderUserId , fq.receiverUserId,  u.email , u.firstName , u.lastName , u.profilePic , fq.createdAt FROM friendsRequest AS fq JOIN users AS u ON (u.id = fq.senderUserId) ORDER BY fq.createdAt DESC;`;
            db.query(q3 ,(err,data) => {
                if(err) return res.status(404).json({message:"Error get friends request" ,error:err});
                res.status(200).json(data[0]);
            })
        })
    })
}
const deleteRequest= (req,res) => {
    const q = 'DELETE FROM friendsRequest WHERE senderUserId = ? AND receiverUserId = ?';
    db.query(q , [req.body.senderUserId , req.body.receiverUserId ], (err,data) => {
        if(err) return res.status(404).json({message:"Error delete friends request" ,error:err});
        if(data.affectedRows <= 0) return res.status(404).json({message:"Delete failed"});
        res.status(200).json({message:"Delete successfully"});
    })
}
module.exports = {
    getUsersRequest,
    addFriendsToRequest,
    deleteRequest
}