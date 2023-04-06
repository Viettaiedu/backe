const db = require("../db");
const moment = require("moment");
const getUserFriends = (req, res) => {
  const q = `SELECT distinct u.id , u.email,u.firstName,u.lastName,u.profilePic , u.coverPic , u.createdAt FROM users AS u JOIN friends AS f ON (u.id=f.userId_1 OR u.id = userId_2) WHERE (f.userId_1 = ? OR f.userId_2 = ?) AND u.id <> ?`;
  db.query(q, [req.query.id, req.query.id, req.query.id], (err, data) => {
    if (err)
      return res
        .status(404)
        .json({ message: "Error systax query sql", error: err });
    res.status(200).json(data);
  });
};

const getUserOthers = (req, res) => {
  const q = `SELECT distinct u.id , u.email,u.firstName,u.lastName,u.profilePic , u.coverPic , u.createdAt FROM users AS u WHERE u.id NOT IN ( SELECT u.id FROM users AS u JOIN friends AS f ON (u.id=f.userId_1 OR u.id = userId_2) WHERE (userId_1 = ? OR userID_2 = ?)) AND u.id <> ?`;
  db.query(q, [req.query.id, req.query.id, req.userInfo.id], (err, data) => {
    if (err)
      return res
        .status(404)
        .json({ message: "Error systax query sql", error: err });
    res.status(200).json(data);
  });
};

const addFriend = (req, res) => {
  const q =
    "INSERT INTO friends(`userId_1` ,`userId_2` , `createdAt`) VALUES(?)";
  const date = moment().locale("vi").format("YYYY-MM-DD HH:mm:ss");
  const values = [req.body.userId_1, req.body.userId_2, date];
  db.query(q, [values], (err, data) => {
    if (err)
      return res
        .status(404)
        .json({ message: "Error when add friend", error: err });
    if (data.affectedRows <= 0)
      return res
        .status(404)
        .json({ message: "Error when add friend", error: err });
    const q = `SELECT distinct u.id , u.email,u.firstName,u.lastName,u.profilePic , u.coverPic , u.createdAt FROM users AS u JOIN friends AS f ON (u.id=f.userId_1 OR u.id = userId_2)`;
    db.query(q, (err, data) => {
      if (err)
        return res
          .status(404)
          .json({ message: "Erro when get user", error: err });
      res.status(200).json(data[data.length - 1]);
    });
  });
};
module.exports = {
  getUserFriends,
  getUserOthers,
  addFriend,
};
