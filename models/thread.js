var model = function(sequelize, Datatypes) {

    var Thread =  sequelize.define('Thread', {
        title: Datatypes.STRING,
        username: Datatypes.STRING,
        description: Datatypes.TEXT,
        threadDate: Datatypes.DATE
    });

    return Thread;
}

module.exports = model;