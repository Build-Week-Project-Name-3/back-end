const db = require("../data/db-config");

function getPlants(user_id) {
  return db("plants").where("user_id", user_id);
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(plant_id) {
  return db("plants").where("plant_id", plant_id).first();
}

async function insertPlant(plant) {
  const [newPlantObject] = await db("plants").insert(plant, [
    "plant_id",
    "plant_name",
    "plant_species",
    "h2oFrequency",
    "image_url",
    "user_id",
  ]);
  return newPlantObject;
}

async function updatePlant(plant, plant_id) {
  const [newPlantObject] = await db("plants")
    .update(plant, [
      "plant_id",
      "plant_name",
      "plant_species",
      "h2oFrequency",
      "image_url",
      "user_id",
    ])
    .where("plant_id", plant_id);
  return newPlantObject;
}

module.exports = {
  getPlants,
  findBy,
  findById,
  insertPlant,
  updatePlant,
};
