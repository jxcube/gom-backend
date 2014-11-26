module.exports = function(sequelize, DataTypes){
    var Post = sequelize.define('Post',{
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 64]
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                Post.belongsTo(models.Thread);
                Post.belongsTo(models.User);
            }
        }
    });

    return Post;
}



