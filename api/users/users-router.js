const usersRouter = require("express").Router();
const { validateUserId } = require("../auth/auth-middleware");
const Users = require("../auth/auth-model");

usersRouter.get("/", async (req, res) => {
  const users = await Users.getUsers();
  res.status(200).json(users);
});

usersRouter.get("/:id", validateUserId, async (req, res) => {
  res.status(200).json(await Users.findById(req.params.id));
});

usersRouter.put("/:id", validateUserId, async (req, res, next) => {
  try {
    const updatedUser = await Users.updateUser(req.user, req.params.id);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
