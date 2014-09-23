var model = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		username: DataTypes.STRING, 
		password: DataTypes.STRING,
		email: DataTypes.STRING
	}, {});

	return User;
}

module.exports = model;