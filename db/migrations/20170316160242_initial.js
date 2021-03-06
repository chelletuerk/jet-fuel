exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('folders', function(table) {
            table.increments('id').primary();
            table.string('name');

            table.timestamps();
        }),

        knex.schema.createTable('urls', function(table){
            table.string('id').primary();
            table.string('shortenedUrl');
            table.string('url');
            table.integer('numOfClicks');
            table.string('timestamp');
            table.timestamp('date');
            table.integer('folderId')
                 .references('id')
                 .inTable('folders');

            table.timestamps();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('urls'),
      knex.schema.dropTable('folders')
    ])
};
