exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('folders', function(table) {
            table.increments('id').primary().unique();
            table.string('name');

            table.timestamps();
        }),

        knex.schema.createTable('urls', function(table){
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
        knex.schema.dropTable('folders'),
        knex.schema.dropTable('urls')
    ])
};
