var fs = require('fs');
var path = require('path');
var lodash = require('lodash');

// load the configuration file
var config = require('../config');

// import sequelize module
var Sequelize = require('sequelize');
// define the connection
// param list: dbname, username, password, config object
var sequelize = new Sequelize(config.db.dbname, config.db.username, config.db.password, {
    dialect: 'postgres'
});
// initialize 'virtual' db
var db = {};

/**
* We want to load every model file in this directory
* and put them into the variable 'db' we've declared
* above.
*
* To do this, we need the 'fs' module which will give
* us what it needs to traverse directories/folders within
* the file system.
*
* More info about the 'fs' module:
* http://nodejs.org/documentation/api/
*
* Author: Raibima Imam Putra
*/
fs
    .readdirSync(__dirname) // Gather all files in this directory (./models)
    .filter(function(file) {  // Of all files, throw away index.js
        return (file.indexOf('.') !== 0 && file !== 'index.js')
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

// We want to set up the association between models
Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

/**
* Whoever imports this module (index.js),
* we'll pass the variable db, since it is
* what it needs.
*
* We also pass the sequelize module so that
* we don't have to import that twice in other
* files.
*
* Author: Raibima Imam Putra
*/
module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);