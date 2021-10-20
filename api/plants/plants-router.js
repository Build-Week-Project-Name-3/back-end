const plantsRouter = require("express").Router();
const Plants = require("./plants-model");
const { validatePlant, validatePlantId } = require("./plants-middleware");

plantsRouter.get("/", async (req, res, next) => {
  try {
    const { user_id } = req.headers;
    const plants = await Plants.getPlants(user_id);
    res.status(200).json(plants);
  } catch (err) {
    next(err);
  }
});

plantsRouter.get("/:id", validatePlantId, async (req, res, next) => {
  try {
    const plant = await Plants.findById(req.params.id);
    res.status(200).json(plant);
  } catch (err) {
    next(err);
  }
});

plantsRouter.post("/", validatePlant, async (req, res, next) => {
  try {
    const { user_id } = req.headers;
    const newPlant = await Plants.insertPlant({
      ...req.plant,
      user_id: user_id,
    });
    res.status(201).json(newPlant);
  } catch (err) {
    next(err);
  }
});

plantsRouter.put(
  "/:id",
  validatePlantId,
  validatePlant,
  async (req, res, next) => {
    try {
      const updatedPlant = await Plants.updatePlant(req.plant, req.params.id);
      res.status(200).json(updatedPlant);
    } catch (err) {
      next(err);
    }
  }
);

plantsRouter.delete("/:id", async (req, res, next) => {
  try {
    await Plants.remove(req.params.id);
    res.status(200).json(`plant deleted successfully`);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = plantsRouter;
