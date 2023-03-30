
const db = require('../db');
const getUser = (req,res) => {
    const q = "SELECT * FROM users WHERE id = ?";
    db.query(q , [req.params.userId] , (err,result) => {
        if(err) return res.status(404).json({message:"Error systax query sql", error:err});
        if(result.length <= 0) return res.status(404).json({message:"id user not found"});
        const {password , ...others} = result[0];
        res.status(200).json(others);
    })
}

const getUsers = (req,res) => {
    const q = "SELECT id , email , firstName , lastName , profilePic , coverPic  FROM users ";
    db.query(q , (err,data) => {
        if(err) return res.status(404).json({message:"Error systax query sql", error:err});
        res.status(200).json(data);
    })
}

const updateUser = (req,res) => {
    const q = `UPDATE users SET firstName = ? , lastName = ? , profilePic = ?, coverPic = ?  WHERE id = ?;`;
    db.query(q,[req.body.firstName,req.body.lastName,req.body.profilePic,req.body.coverPic,req.userInfo.id],(err,data) => {
        if(err) return res.status(404).json({message:"Error systax query sql", error:err});
    })
    const q2 = "SELECT * FROM users WHERE id =?;";
    db.query(q2 , [req.userInfo.id] , (err,data) => {
        if(err) return res.status(404).json({message:"Error systax query sql", error:err});
        const {password ,...others} = data[0];
        res.status(200).json(others);
    })
}






module.exports = {
    getUser,
    updateUser,
    getUsers
}