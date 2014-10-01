/**
* This is where API routes are defined.
*/

var express = require('express');
var router = express.Router();
var db = require('../models');

router.route('/user')
    // GET /api/user -> all user data
    .get(function(req, res) {
        db.User.findAll({
            attributes: ['username', 'email']
        })
            .success(function(users) {
                res.json(users);
            });
    })
	
	.post(function(req,res) {
		if (!(req.body.username && req.body.password && req.body.email)) {
			res.json({
				message: 'error',
				detail: 'please provide complete information'
			});
		}

		// Create new user entry
		db.User.create({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email
		}).complete(function(err) {
			if (err) {
				res.json({ message: 'error' });
			} else {
				res.json({ message: 'success'}); 
			}
		});
		
	});
	
router.route('/item')
	.get(function(req, res) {
		db.Item.findAll()
			.success(function(items) {
				res.json(items);
			});
	})
	
	.post(function(req,res) {
		// Create new item entry
		db.Item.create({
			name: req.body.name,
			price: req.body.price,
			description: req.body.description
		}).complete(function(err) {
			if (err) {
				res.json({ message: 'error' });
			} else {
				res.json({ message: 'success'});
			}
		});
		
	});

module.exports = router;
