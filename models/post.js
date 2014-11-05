module.exports = function(sequelize, Datatypes){
    var Post = sequelize.define('Post',{
        title : Datatypes.STRING,
        content: Datatypes.TEXT
    }, {
        classMethods: {
            associate: function(models) {
                Post.belongsTo(models.Thread);
                Post.belongsTo(models.User);
            }
        }
    });

}



