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

module.exports = {
  getBags,
  addBags
};
