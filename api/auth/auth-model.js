const db = require("../../data/dbConfig");

function findByName(username) {
  return db("users").where("username", username).first();
}
async function add(user){
  return findById( await db('users').insert(user))
}
function findById(id) {
  return db("users").where('id', id).first();
}

module.exports = {
  findByName,
  add,
  findById,
};
