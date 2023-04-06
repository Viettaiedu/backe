require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//     // optionSuccessStatus: 200,
//   })
// );
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

const routesAuth = require("./routes/auth");
const routesUsers = require("./routes/users");
const routesComments = require("./routes/comments");
const routesPosts = require("./routes/posts");
const routesLikes = require("./routes/likes");
const routesStories = require("./routes/stories");
const routesUpload = require("./routes/upload");
const routesFriends = require("./routes/friends");
const routesFriendsRequest = require("./routes/friendsRequest");
const routesInfos = require("./routes/info");
const routesConversations = require("./routes/conversations");
const routesMessenges = require("./routes/messenges");
const routesNotifications = require("./routes/notifications");

app.use("/api/auth", routesAuth);
app.use("/api/users", routesUsers);
app.use("/api/comments", routesComments);
app.use("/api/posts", routesPosts);
app.use("/api/likes", routesLikes);
app.use("/api/stories", routesStories);
app.use("/api/friends", routesFriends);
app.use("/api/upload", routesUpload);
app.use("/api/friends-request", routesFriendsRequest);
app.use("/api/infos", routesInfos);
app.use("/api/conversations", routesConversations);
app.use("/api/notifications", routesNotifications);
app.use("/api/messenges", routesMessenges);
const PORT = 5500;

app.listen(PORT, () => console.log("listening on port " + PORT));
