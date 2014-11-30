module.exports = function(sequelize, DataTypes){
    var Post = sequelize.define('Post',{
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 64],
                    msg: 'your title is too short (should be at least 6 character long)'   
                }
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



