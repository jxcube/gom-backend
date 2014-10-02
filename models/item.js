var model =function(sequelize,DataTypes){
	var Item = sequelize.define('Item',{
		name: DataTypes.STRING,
		price: DataTypes.DECIMAL(15,2),
		description: DataTypes.TEXT,
		pictureUrl: DataTypes.STRING,
		tag : DataTypes.ARRAY(DataTypes.STRING)
	}, {});
	return Item;
}
module.exports = model;
