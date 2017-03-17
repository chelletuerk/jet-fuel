exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('urls', function(table){
            table.integer('folderId')
                 .references('id')
                 .inTable('folders');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('urls', function(table){
          table.dropColumn('folderId');
        })
    ])
};
