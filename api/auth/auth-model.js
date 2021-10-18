const db = require("../data/db-config");

function getUsers() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users").where("user_id", id).first();
}

async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [newUserObject] = await db("users").insert(user, [
    "user_id",
    "username",
    "password",
    "phoneNumber",
  ]);
  return newUserObject;
}

// async function add(user) {
//     const [id] = await db("users").insert(user);
//     return findById(id);
//   }

module.exports = {
  getUsers,
  findBy,
  findById,
  insertUser,
};
