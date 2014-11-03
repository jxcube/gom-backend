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
		if (!(req.body.username && req.body.password && req.body.email && req.body.gender)) {
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
				res.json({
					message: 'error',
					detail : 'username / email already exist'
				});
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
router.route('/item/random')
	.get(function(req,res){
		db.Item.getRandom(function(item) {
			res.json(item);
		});
	})


router.route('/thread')
	.get(function(req,res) {
		db.Thread.findAll()
			.success(function(threads){
				res.json(threads);
			});
	})
	.post(function(req,res) {
		db.Thread.create({
			title : req.body.title,
			username: req.body.username,
			description : req.body.description
		}).complete(function(thread){
			res.json({message : 'success'});
		});
	})
	
router.route('/post')
	.get(function(req,res){
		db.Post.findAll()
			.success(function(posts){
				res.json(posts);
			});
	})
	.post(function(req,res){
		db.Post.create({
			title : req.body.title,
			username: req.body.username,
			itemName : req.body.itemName,
			price : req.body.price
		}).complete(function(post){
			res.json({message : 'success'});
		})
	});

router.route('/developer')
    .get(function(req, res) {
        db.Developer.findAll({
            attributes: ['username', 'email','companyName']
        })
            .success(function(developers) {
                res.json(developers);
            });
    })
	
	.post(function(req,res) {
		if (!(req.body.username && req.body.password && req.body.email && req.body.companyName)) {
			res.json({
				message: 'error',
				detail: 'please provide complete information'
			});
            return;
		}

		// Create new developer entry
		db.Developer.create({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			companyName: req.body.companyName
		}).complete(function(err) {
			if (err) {
				res.json({
					message: 'error',
					detail : 'username / email already exist'
				});
			} else {
				res.json({ message: 'success'}); 
			}
		});
		
	});

module.exports = router;
