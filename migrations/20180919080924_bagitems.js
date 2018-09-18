exports.up = knex =>
  knex.schema.createTable("bagitems", table => {
    table.increments("id").primary();
    table.string("bag_id");
    table.integer("username");
    table.string("bag_item");
  });

exports.down = knex => knex.schema.dropTable("bagitems");
