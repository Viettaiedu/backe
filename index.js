require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, Authorization, X-Request-With"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  res.setHeader("Content-Type", "application/json; charset=utf-8");
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
