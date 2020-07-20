const config = {
    port: 8080,
    database: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: './sfn.db'
        },
        migrations: {
            directory: './db/migrations'
        },
        seeds: {
            directory: './db/seeds'
        }
    },
    services: {
        steam_service: {
            url: 'https://steam-serv.herokuapp.com'
        }
    }
};

module.exports = config;