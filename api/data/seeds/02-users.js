exports.seed = function (knex) {
  return knex("users").insert([
    {
      user_id: 0,
      username: "bobross",
      password: "happymistakes",
      phoneNumber: "+14355313213",
    },
  ]);
};
