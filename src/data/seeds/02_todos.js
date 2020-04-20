exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("todos")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("todos").insert([
        {
          id: 1,
          name: "First todo",
          description: "Really need to lean GQL",
          user_id: 1,
        },
      ]);
    });
};
