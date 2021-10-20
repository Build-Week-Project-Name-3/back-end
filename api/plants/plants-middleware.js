const Plants = require("./plants-model");
const Users = require("../auth/auth-model");

const validatePlant = async (req, res, next) => {
  const { plant_name, plant_species, h2oFrequency } = req.body;
  if (
    !plant_name ||
    !plant_name.trim() ||
    !plant_species ||
    !plant_species.trim() ||
    !h2oFrequency
  ) {
    next({ status: 400, message: "all fields are required" });
  }
  req.plant = req.body;
  next();
};

const validatePlantId = async (req, res, next) => {
  try {
    const plant = await Plants.findById(req.params.id);
    if (plant) {
      next();
    } else {
      next({ status: 404, message: "plant not found" });
    }
  } catch (error) {
    next(error);
  }
};

const checkUserId = async (req, res, next) => {
  const { user_id } = req.headers;
  const user = await Users.findById(user_id);
  if (!user) {
    next({ status: 400, message: "user_id property not found in header" });
  }
  next();
};

module.exports = {
  validatePlant,
  checkUserId,
  validatePlantId,
};
