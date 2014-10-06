/**
* This is the definition of User model.
* 
* Commented by: Raibima Imam Putra
* Coded by: Yonas Reynald D. N.
*/
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
		email: DataTypes.STRING,
		gender: DataTypes.STRING
    });
}