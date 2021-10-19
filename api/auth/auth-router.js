const authRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./auth-model");
const buildToken = require("./token-builder");
const {
  checkUsernameFree,
  checkUsernameExists,
  checkPhoneNumberFree,
  validateUser,
} = require("./auth-middleware");

authRouter.post(
  "/register",
  validateUser,
  checkUsernameFree,
  checkPhoneNumberFree,
  async (req, res, next) => {
    try {
      const { username, password, phoneNumber } = req.body;
      const rounds = process.env.BCRYPT_ROUNDS || 8;
      const hash = bcrypt.hashSync(password, rounds);
      const user = { username, password: hash, phoneNumber };
      const newUser = await Users.insertUser(user);
      res
        .status(201)
        .json({
          message: `successfully created an account with the username ${newUser.username}`,
        });
    } catch (err) {
      next(err);
    }
  }
);

authRouter.post(
  "/login",
  validateUser,
  checkUsernameExists,
  (req, res, next) => {
    const { password } = req.body;
    if (bcrypt.compareSync(password, res.user.password)) {
      const token = buildToken(res.user);
      res.status(200).json({
        message: `welcome, ${res.user.username}`,
        user_id: res.user.user_id,
        token,
      });
    } else {
      next({ status: 401, message: "invalid credentials" });
    }
  }
);

module.exports = authRouter;
