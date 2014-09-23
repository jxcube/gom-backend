var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var lodash = require('lodash');
var db = {};
var sequielize = new Sequelize('gom_db', 'jxcube', null, {
    dialect: 'sqlite',
    storage: '../gom_db.sqlite'
});

fs
    .readDirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0 && file !== 'index.js')
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
});