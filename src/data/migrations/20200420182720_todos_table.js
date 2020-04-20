exports.up = function (knex) {
  return knex.schema.createTable("todos", (tbl) => {
    tbl.increments();
    tbl.text("name").notNullable();
    tbl.text("description").notNullable();
    tbl.text("user_id").notNullable();
    tbl.boolean("complete").default(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("todos");
};
