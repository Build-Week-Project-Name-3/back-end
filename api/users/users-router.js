const usersRouter = require("express").Router();
const Users = require("../auth/auth-model");

usersRouter.get("/", async (req, res) => {
  const users = await Users.getUsers();
  res.status(200).json(users);
});

usersRouter.get("/:id", async (req, res) => {
  res.status(200).json(await Users.findById(req.params.id));
});

module.exports = usersRouter;
