module.exports = function(sequelize, Datatypes){
    return sequelize.define('Thread',{
        title : Datatypes.STRING,
        username : Datatypes.STRING,
        description : Datatypes.TEXT
    });
}



module.exports = model;

