const db = require("../../data/dbConfig");

function findByName(username) {
  return db("users").where("username", username).first();
}
async function add(user) {
  const id = await db("users").insert(user);
  return findById(id);
}

function findById(id) {
  return db("users").where({ id }).first();
}

module.exports = {
  findByName,
  add,
  findById,
};
