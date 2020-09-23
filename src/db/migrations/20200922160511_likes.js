exports.up = function(knex) {
    return knex.schema.createTable('likes', function(table){
        table.increments('id').notNullable(),
 
        table.integer('poem_Id').unsigned().notNullable(),
        table.foreign('poem_id').references('poems.id'),

        table.integer('user_id').unsigned().notNullable(),
        table.foreign('user_id').references('users.id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('likes');
};