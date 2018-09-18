const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];
const knex = require("knex")(config);

function getBags(username, testDb) {
  console.log("getting bags for " + username);
  const connection = testDb || knex;
  return connection("bags")
    .select()
    .where("username", username);
}

function addBags(username, description, destination, testDb) {
  console.log("adding bags for " + username);
  const connection = testDb || knex;
  return connection("bags").insert({
    username: username,
    destination: destination,
    description: description
  });
}

function deleteBag(id, username, testDb) {
  console.log("nuking bag" + id);
  const connection = testDb || knex;
  return connection("bags")
    .where("id", id)
    .del()
    .then(data => {
      return connection("bags")
        .select()
        .where("username", username);
    });
}

module.exports = {
  getBags,
  addBags,
  deleteBag
};
