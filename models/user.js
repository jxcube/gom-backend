module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isAlphanumeric: {
                    msg: 'username should only contain alphabets and numerics'
                },
                len: [6, 15]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
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