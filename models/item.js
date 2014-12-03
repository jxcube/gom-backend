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
			filterByTagInclusive: function(items, tags, callback) {
				items = items.map(function(item) {
					item.tag = item.tag.map(function(tag) {
						return tag.toLowerCase();
					});
					return item;
				})
				items = items.filter(function(item) {
					var intersection = [];
					for (var i = 0; i < tags.length; i++) {
						if (item.tag.indexOf(tags[i]) != -1) {
							intersection.push(tags[i]);
						}
					}
					return intersection.length === tags.length;
				});
				return callback(null, items);
			},

			filterByTagExclusive: function(items, tags, callback) {
				items = items.map(function(item) {
					item.tag = item.tag.map(function(tag) {
						return tag.toLowerCase();
					});
					return item;
				})
				items = items.filter(function(item) {
					for (var i = 0; i < tags.length; i++) {
						if (item.tag.indexOf(tags[i]) != -1) {
							return true;
						}
					}
					return false;
				});
				return callback(null, items);
			},
			filterByPrice: function(price, callback)
			{
				var p = parseFloat(price);
				this.findAll().then(function(items){
					var filterPrice = items.filter(function(item){
						if (item.minPrice < p){
							return true;
						}
					})
				
					callback(filterPrice);
				})
					
				
			}
		} 

	});

	return Item;

}
module.exports = model;
