/**
* This is the definition of User model.
* 
* Commented by: Raibima Imam Putra
* Coded by: Yonas Reynald D. N.
*/
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        username: {type : DataTypes.STRING, unique : true},
        password: DataTypes.STRING,
		email: {type : DataTypes.STRING, unique : true},
		gender: DataTypes.STRING
    }, {
        classMethods: {
            getByEmail: function(email) {
                return this.find({
                    where: {
                        email: email
                    },
                    attributes: ['username', 'email', 'password']
                });
            },
            getByUsername: function(username){
                return this.find({
                    where: {
                        username: username
                    },
                    attributes: ['username', 'email', 'password']
                });
            }
        }
    });
}