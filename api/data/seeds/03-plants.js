exports.seed = function (knex) {
  return knex("plants").insert([
    {
      plant_id: 0,
      plant_name: "Aglaonema",
      plant_species: "Chinese Evergreen",
      h2oFrequency: 21,
      image_url:
        "https://www.ourhouseplants.com/imgs-content/Aglaonema-Chinese-Evergreen-Maria.jpg",
      user_id: 0,
    },
  ]);
};
