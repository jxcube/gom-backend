module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Developer', {
        username: {type : DataTypes.STRING, unique : true},
        companyName : DataTypes.STRING,   
        password: DataTypes.STRING,
        email: {type : DataTypes.STRING, unique : true}
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