// const Plants = require("./plants-model");

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
  next();
};

const checkUserId = async (req, res, next) => {
  const { user_id } = req.headers;
  if (!user_id) {
    next({ status: 400, message: "user_id property not found in header" });
  }
  next();
};

module.exports = {
  validatePlant,
  checkUserId,
};
