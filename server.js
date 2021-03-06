const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
// Always require and configure near the top
require("dotenv").config();

// connect to the database
require("./config/database");

const recordsRouter = require("./routes/api/records");
const usersRouter = require("./routes/api/users");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// Middleware to verify token and assign user object of payload to req.user
// Be sure to mount before our routes
app.use(require("./config/checkToken"));

// Middleware to verify token and assign user object of payload to req.user
// Be sure to mount before our routes
app.use(require("./config/checkToken"));

//api routes will go here
app.use("/api/records", recordsRouter);
app.use("/api/users", usersRouter);

// The following "catch all" route (note the *) is necessary
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Configure to use port 3001 instead of 3000 during development to avoid collision with React's dev server
const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
