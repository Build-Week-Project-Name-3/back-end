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
  const [newUserObject] = await db("users").insert(user, [
    "user_id",
    "username",
    "password",
    "phoneNumber",
  ]);
  return newUserObject;
}

module.exports = {
  getUsers,
  findBy,
  findById,
  insertUser,
};
