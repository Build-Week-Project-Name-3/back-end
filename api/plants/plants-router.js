const plantsRouter = require("express").Router();
const Plants = require("./plants-model");

plantsRouter.get("/", async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const plants = await Plants.getPlants(user_id);
    res.status(200).json(plants);
  } catch (err) {
    next(err);
  }
});

// plantsRouter.get("/:id", async (req, res, next) => {
//     try {

//     }
//     catch (err) {
//         next(err)
//     }
// });

module.exports = plantsRouter;
