exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.text("username").notNullable();
    tbl.text("email").notNullable();
    tbl.boolean("admin").default(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
