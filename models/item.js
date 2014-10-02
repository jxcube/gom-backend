var model =function(sequelize,DataTypes){
	var Item = sequelize.define('Item',{
		name: DataTypes.STRING,
		minPrice: DataTypes.DECIMAL(15,2),
		maxPrice : DataTypes.DECIMAL(15,2),
		description: DataTypes.TEXT,
		imgUrl: DataTypes.STRING,
		tag : DataTypes.ARRAY(DataTypes.STRING)
	}, {});
	return Item;
}
module.exports = model;
