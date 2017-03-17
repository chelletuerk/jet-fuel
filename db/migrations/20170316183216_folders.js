exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.table('urls', function(table){
          table.string('id').primary();
          table.string('shortenedUrl').unique();
          table.string('url');
          table.integer('numOfClicks');
          table.integer('folderId')
               .references('id')
               .inTable('folders');

          table.timestamps();
      })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.drop('urls')
  ])
};
