exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('urls', function(table){
            table.string('timestamp');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('urls', function(table){
          table.dropColumn('timestamp');
        })
    ])
};
