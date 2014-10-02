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
					price: item.price,
					description: item.description,
	                pictureUrl: item.pictureUrl,
	                tag : item.tag
				});

			});
		});
	}
}