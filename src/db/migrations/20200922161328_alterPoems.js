exports.up = function(knex) {
    return knex.schema.alterTable('likes', function(table){
        table.integer('likes')
    })
};

exports.down = function(knex) {
    
};
