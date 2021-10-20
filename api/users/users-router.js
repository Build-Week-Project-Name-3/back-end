const usersRouter = require("express").Router();
const {
  validateUserId,
  validateUserUpdate,
} = require("../auth/auth-middleware");
const { checkUserId } = require("../plants/plants-middleware");
const Users = require("../auth/auth-model");

usersRouter.get("/", async (req, res) => {
  const users = await Users.getUsers();
  res.status(200).json(users);
});

usersRouter.get("/:id", validateUserId, async (req, res) => {
  res.status(200).json(await Users.findById(req.params.id));
});

usersRouter.put(
  "/:id",
  validateUserUpdate,
  validateUserId,
  checkUserId,
  async (req, res, next) => {
    try {
      const updatedUser = await Users.updateUser(res.user, req.params.id);
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
      41;
    }
  }
);

module.exports = usersRouter;
