exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 200).unique().notNullable();
      users.string("password", 200).notNullable();
      users.string("phoneNumber", 200).unique().notNullable();
      users.timestamps(false, true);
    })
    .createTable("plants", (plants) => {
      plants.increments("plant_id");
      plants.string("plant_name", 200).notNullable();
      plants.string("plant_species", 200).notNullable();
      plants.string("h2oFrequency", 200).notNullable();
      plants.string("image_url", 200);
      plants
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("RESTRICT");
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("plants").dropTableIfExists("users");
};
