exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        id: 13456576574567,
        name: "Elijah Williams",
      }),
      knex('folders').insert({
        id: 242534563546546,
        name: "Chelle Tuerk",
      })
    ]);
  });
};
