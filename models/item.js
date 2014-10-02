var model =function(sequelize,DataTypes){
	var Item = sequelize.define('Item',{
		name: DataTypes.STRING,
		price: DataTypes.DECIMAL(15,2),
		description: DataTypes.TEXT,
		tag : DataTypes.STRING
	}, {});
	return Item;
}
module.exports = model;
