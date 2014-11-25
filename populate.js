var fs = require('fs');
var file = __dirname + '/items.json';

var db = require('./models')

module.exports = {
	populate: function(){
		fs.readFile(file, 'utf8', function(err, items) {
			if (err) {
				console.log('Error: ' + err);
				return;
			}

			items = JSON.parse(items);

			db.Item.bulkCreate(items);
		});
	}
}