// Setting up the database connection

// username, password, and database name should match database.json
const knex = require('knex')({
    client: 'mysql',
    connection: {
        user: 'foo',
        password: 'bar',
        database: 'posters',
        host: '127.0.0.1'
    }
});

// bookshelf
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;