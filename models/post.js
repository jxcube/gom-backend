var model = function(sequlize, Datatypes){
    var Post =  sequelize.define('Post'){
        title = Datatypes.STRING,
        username = Datatypes.STRING,
        itemName = Datatypes.TEXT,
        price = Datatypes.DECIMAL(15,2),
        postDate = Datatypes.DATE
    }
}