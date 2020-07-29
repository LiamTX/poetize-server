exports.up = function(knex) {
    return knex.schema.createTable('poems', function(table){
        table.increments('id').notNullable(),
        table.string('title', [200]).unique().notNullable(),
        table.text('poem').notNullable(),
        table.integer('likes'),

        table.integer('user_id').unsigned().notNullable(),
        table.foreign('user_id').references('users.id'),

        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('poems');
};