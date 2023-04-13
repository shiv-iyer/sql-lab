// model: JavaScript class that represents one table
// one instance of the model represents one row in the table

const bookshelf = require('../bookshelf');

// Create a new Poster model and store it in the Poster object
const Poster = bookshelf.model('Poster', {
    tableName: 'posters'
});

module.exports = { Poster };