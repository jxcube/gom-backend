var model = function(sequlize, Datatypes){
    var Thread =  sequelize.define('Thread'){
        title = Datatypes.STRING,
        username = Datatypes.STRING,
        description = Datatypes.TEXT,
        threadDate = Datatypes.DATE
    }
}