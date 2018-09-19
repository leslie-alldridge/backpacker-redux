exports.up = knex =>
  knex.schema.createTable("bags", table => {
    table.increments("id").primary();
    table.string("username");
    table.string("bag");
    table.string("destination");
    table.string("description");
  });

exports.down = knex => knex.schema.dropTable("bags");
