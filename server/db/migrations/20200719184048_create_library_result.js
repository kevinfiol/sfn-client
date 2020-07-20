
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('library_result', table => {
            table.increments('id').primary();
            table.string('nanoid').notNullable();
            table.string('idString').notNullable();
            table.json('profiles').notNullable();
            table.json('steamapps');
            table.unique(['nanoid', 'idString']);
            table.timestamps();
        })
    ]);
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable('library_result')
    ]);
};
