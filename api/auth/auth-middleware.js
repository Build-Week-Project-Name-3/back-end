const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");
const Users = require("./auth-model");

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next({ status: 401, message: "token required" });
  }
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return next({ status: 401, message: "token invalid" });
    }
    req.decodedToken = decodedToken;
    return next();
  });
};

const checkUsernameFree = async (req, res, next) => {
  const { username } = req.body;
  const user = await Users.findBy({ username }).first();
  if (!user) {
    res.user = req.body;
    next();
  } else {
    next({ status: 401, message: "username taken" });
  }
};

const checkPhoneNumberFree = async (req, res, next) => {
  const { phoneNumber } = req.body;
  if (phoneNumber) {
    const user = await Users.findBy({ phoneNumber }).first();
    if (!user) {
      next();
    } else {
      next({ status: 401, message: "invalid phone number" });
    }
  } else {
    next({ status: 400, message: "phone number is required" });
  }
};

const checkUsernameExists = async (req, res, next) => {
  const { username } = req.body;
  const user = await Users.findBy({ username }).first();
  if (user) {
    res.user = user;
    next();
  } else {
    next({ status: 401, message: "invalid credentials" });
  }
};

const validateUser = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !username.trim() || !password || !password.trim()) {
    next({ status: 400, message: "user and password are required" });
  }
  next();
};

const validateUserId = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    if (user) {
      res.user = req.body;
      next();
    } else {
      next({ status: 404, message: "user not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPhoneNumberFree,
  validateUser,
  validateUserId,
};
