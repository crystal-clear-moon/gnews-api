const http = require("http");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

var app = express();

// set middleware
const corsOpts = {
  origin: '*'
};

app.use(cors(corsOpts));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(require("morgan")("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", require("./routes"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const error = new Error("Not Found 404");
  error.status = 404;
  next(error);
});

// error handler
app.use(function (err, req, res) {
  console.log(err.status);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      error: err,
    },
  });
});

// prevent app crash
process.on('uncaughtException', (error, origin) => {
  console.log('----- Uncaught exception -----')
  console.log(error)
  console.log('----- Exception origin -----')
  console.log(origin)
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('----- Unhandled Rejection at -----')
  console.log(promise)
  console.log('----- Reason -----')
  console.log(reason)
});

const httpServer = http.createServer(app);

httpServer.listen(process.env.PORT, () => {
  console.log("Server is running on port: ", process.env.PORT);
});