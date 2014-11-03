module.exports = function(sequelize, Datatypes){
    return sequelize.define('Post',{
        title : Datatypes.STRING,
        username : Datatypes.STRING,
        itemName : Datatypes.TEXT,
        price : Datatypes.DECIMAL(15,2)
    });
    Post
        .belongsTo(User)
        .hasOne(Thread)

}



