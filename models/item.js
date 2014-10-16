var model =function(sequelize,DataTypes){
	var Item = sequelize.define('Item',{
		name: DataTypes.STRING,
		minPrice: DataTypes.DECIMAL(15,2),
		maxPrice : DataTypes.DECIMAL(15,2),
		description: DataTypes.TEXT,
		imgUrl: DataTypes.STRING,
		tag : DataTypes.ARRAY(DataTypes.STRING)
	}, {
		classMethods: {
			getRandom : function(callback)
			{
				this.findAll().success(function(items){
					callback(items[Math.floor(Math.random()*items.length)]);
				});
			}
		} 

	});

	return Item;

}
module.exports = model;
