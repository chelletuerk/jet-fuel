exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        id: 1,
        name: "Elijah Williams",
      }),
      knex('folders').insert({
        id: 2,
        name: "Chelle Tuerk",
      })
    ]);
  });
};
