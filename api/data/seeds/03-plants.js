exports.seed = function (knex) {
  return knex("plants").insert([
    {
      plant_id: 0,
      plant_name: "Aglaonema",
      plant_species: "Chinese Evergreen",
      h2oFrequency: "once every few weeks",
      image_url:
        "https://www.ourhouseplants.com/imgs-content/Aglaonema-Chinese-Evergreen-Maria.jpg",
      user_id: 0,
    },
    {
      plant_id: 1,
      plant_name: "Maranta leuconeura",
      plant_species: "Lemon Lime",
      h2oFrequency: "once a week",
      image_url:
        "https://hometoheather.com/wp-content/uploads/2021/06/lemon-lime-prayer-plant-sm.jpg",
      user_id: 0,
    },
  ]);
};
