
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.increments('id').notNullable(),
        table.string('name', [200]).notNullable(),
        table.string('email', [200]).unique().notNullable(),
        table.text('pass').notNullable(),

        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
