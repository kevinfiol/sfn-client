
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('library_result', table => {
            table.increments('id').primary();
            table.string('nanoid').unique().notNullable();
            table.string('idString').unique().notNullable();
            table.json('profiles').notNullable();
            table.json('steamapps');
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
            table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        })
    ]);
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable('library_result')
    ]);
};
