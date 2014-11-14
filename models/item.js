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
			}, 
			filterByTag: function(tags, callback){
				this.findAll().then(function(items){
					var filteredItems = items.filter(function(item){
						for(var i=0; i < item.tag.length; i++){
							for (var j=0; j < tags.length; j++){
								if (item.tag[i].toLowerCase()===tags[j]){
									return true;
								}
							}
						}
						return false;
					})
					callback(filteredItems);
				})

			}
		} 

	});

	return Item;

}
module.exports = model;
