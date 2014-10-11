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
            attributes: ['username', 'email','gender']
        })
            .success(function(users) {
                res.json(users);
            });
    })
	
	.post(function(req,res) {
		if (!(req.body.username && req.body.password && req.body.email && req.body.gender) {
			res.json({
				message: 'error',
				detail: 'please provide complete information'
			});
            return;
		}

		// Create new user entry
		db.User.create({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			gender: req.body.gender
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
	});

module.exports = router;
