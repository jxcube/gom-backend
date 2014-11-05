module.exports = function(sequelize, Datatypes){
    var Thread = sequelize.define('Thread',{
        title: Datatypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Thread.hasMany(models.Post);
            }
        }
    });

    return Thread;
}


