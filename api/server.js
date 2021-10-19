const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");
const plantsRouter = require("./plants/plants-router");
const { restricted } = require("./auth/auth-middleware");
const { checkUserId } = require("./plants/plants-middleware");
const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/plants", restricted, checkUserId, plantsRouter);

// eslint-disable-next-line
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
