exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "BillyJean", email: "BillyJean@email.com" },
        { id: 2, username: "RickyBobby", email: "RickyBobby@email.com" },
        { id: 3, username: "BobbyRay", email: "BobbyRay@email.com" },
      ]);
    });
};
