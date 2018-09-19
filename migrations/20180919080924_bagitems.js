exports.up = knex =>
  knex.schema.createTable("bagitems", table => {
    table.increments("id").primary();
    table.string("bagid");
    table.string("username");
    table.string("bagitem");
    table.boolean("archived").defaultTo(false);
  });

exports.down = knex => knex.schema.dropTable("bagitems");
