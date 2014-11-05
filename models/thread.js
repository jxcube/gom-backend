module.exports = function(sequelize, Datatypes){
    var Thread = sequelize.define('Thread',{
        title: Datatypes.STRING,
        description: Datatypes.TEXT
    }, {
        classMethods: {
            associate: function(models) {
                Thread.hasMany(models.Post);
            }
        }
    });

    return Thread;
}


