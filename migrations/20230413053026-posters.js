// posters migration

'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

// exports.up is to create the table
exports.up = function(db) {
  return db.createTable('posters', {
    id: {type: 'int', primaryKey: true, autoIncrement: true, unsigned: true},
    title: {type: 'string', length: 100, notNull: true},
    cost: {type: 'int', notNull: true},
    decsription: 'text',
    // hmm what data type would this be... just leave as string for now
    date: 'string',
    stock: {type: 'int', notNull: true},
    // in cm
    height: 'int',
    // in cm
    width: 'int'
  });
};

// exports.down is to delete the table
exports.down = function(db) {
  return db.dropTable('posters');
};

exports._meta = {
  "version": 1
};
