exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('urls', function(table){
            table.integer('numOfClicks');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('urls', function(table){
          table.dropColumn('numOfClicks');
        })
    ])
};
