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

function updateBag(id, destination, description, username, testDb) {
  console.log("updating bag" + id);
  console.log(destination, description);

  const connection = testDb || knex;
  return connection("bags")
    .where("id", id)
    .update({
      destination: destination,
      description: description
    })
    .then(data => {
      return connection("bags")
        .select()
        .where("username", username);
    });
}

function addBagItem(username, id, input, testDb) {
  console.log("adding bags item for " + username);
  console.log(id, input);

  const connection = testDb || knex;
  return connection("bagitems")
    .insert({
      bag_id: id,
      username: username,
      bag_item: input,
      archived: true
    })
    .then(data => {
      return connection("bagitems").where({
        bag_id: id
      });
    });
}

function getBagItem(username, id, testDb) {
  console.log("getting bag items for " + username + "bag " + id);
  const connection = testDb || knex;
  return connection("bagitems")
    .select()
    .where({ username: username, bag_id: id });
}

function archiveBagItem(username, id, item, testDb) {
  console.log("archiving an item" + username + "bag " + id + item);
  const connection = testDb || knex;
  return connection("bagitems")
    .where({ username: username, bag_id: id, bag_item: item })
    .update({
      archived: 0
    })
    .then(data => {
      return connection("bagitems")
        .select()
        .where({ username: username, bag_id: id });
    });
}

module.exports = {
  getBags,
  addBags,
  deleteBag,
  updateBag,
  addBagItem,
  getBagItem,
  archiveBagItem
};
