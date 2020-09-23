exports.up = function(knex) {
    return knex.schema.alterTable('poems', function(table){
        table.integer('likes')
    })
};

exports.down = function(knex) {
    
};
