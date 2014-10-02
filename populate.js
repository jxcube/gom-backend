var fs = require('fs');
var file = __dirname + '/items.json';

var db = require('./models')

module.exports = {
	populate: function() {
		fs.readFile(file, 'utf8', function(err, items) {
			if (err) {
				console.log('Error: ' + err);
				return;
			}

			items = JSON.parse(items);

			items.forEach(function(item) {
				console.log("Inserting %s into the database...", item.name);

				// TODO: Create item
				db.Item.create ({
					name: item.name,
					minPrice: item.minPrice,
					maxPrice: item.maxPrice,
					description: item.description,
	                imgUrl: item.pictureUrl,
	                tag : item.tag
				});

			});
		});
	}
}