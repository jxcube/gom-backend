module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [6, 64]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: ['^(?=.*[a-zA-Z])(?=.*[0-9])', 'i'],
                len: [8, 64]
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'your email address is not formatted properly'
                }
            }
        },
        gender: {
            type: DataTypes.ENUM('male', 'female'),
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Post);
            }
        }
    });

    return User;
}