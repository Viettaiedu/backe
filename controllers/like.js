const db = require("../db");
const moment = require('moment');
const addLike = async (req, res) => {
  const q = "INSERT INTO likes(`userId`,`postId`,`createdAt`) VALUES(?);";
  const date = moment().locale('vi').format('YYYY-MM-DD HH:mm:ss');
  db.query(
    q,
    [[req.body.senderId, req.body.postId , date]],
    (err, data) => {
      if (err)
        return res
          .status(404)
          .json({ message: "Error when add like", error: err });
      if (data.affectedRows <= 0)
        return res.status(404).json({ message: "Update failed" });
    }
  );
  const e =
    "SELECT * FROM likes WHERE userId = ? AND postId = ? ORDER BY id DESC LIMIT 1 ;";
  db.query(e, [req.userInfo.id, req.body.postId], (err, data) => {
    res.status(201).json(data[0]);
  });
};
const getLikes = (req, res) => {
  const q =
    "SELECT DISTINCT l.userId , l.postId   FROM likes AS l JOIN users AS u ON (l.userId = u.id) JOIN posts AS p ON (l.postId = p.id) ;";
  db.query(q, (err, data) => {
    if (err)
      return res
        .status(404)
        .json({ message: "Error when getting commments", error: err });
    res.status(200).json(data);
  });
};
const deleteLike = (req, res) => {
  const q = "DELETE FROM likes WHERE userId = ? AND postId = ?;";
  db.query(q, [req.userInfo.id, req.params.postId], (err, data) => {
    if (err)
      return res
        .status(404)
        .json({ message: "Error when delete like", error: err });
    res.status(200).json(data);
  });
};
module.exports = {
  getLikes,
  addLike,
  deleteLike,
};
