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

		var tags = [];
		if (req.query.tag) {
			tags = req.query.tag.toLowerCase().split('-');
			db.Item.findAll()
				.then(function(items) {
					db.Item.filterByTagInclusive(items, tags, function(err, results) {
						if (err) {
							res.json({ message: 'error', detail: 'error filtering by tags' });
							return;
						}
						if (results.length !== 0) {
							res.json(results);
						} else {
							db.Item.filterByTagExclusive(items, tags, function(err, results) {
								if (err) {
									res.json({ message: 'error', detail: 'error filtering by tags' });
									return;
								}
								res.json(results);
							});
						}
				})
			});
		} else {
			db.Item.findAll()
				.then(function(items) {
					res.json(items);
				});
		}
		
	})
router.route('/item/random')
	.get(function(req,res){
		db.Item.getRandom(function(item) {
			res.json(item);
		});
	}) 

router.route('/item/:id')
	.get(function(req, res) {
		var itemId = req.params.id;
		db.Item.find({
			where: {
				id: itemId
			}
		}).then(function(item) {
			res.json(item);
			}
		).error(function(err) {

		})
	});


router.route('/thread')
	.get(function(req,res) {
		db.Thread.findAll({
			include: [{
				model: db.Post,
				attributes: ['id', 'title', 'content', 'createdAt'],
				include: [{
					model: db.User,
					attributes: ['id','username']
				}]
			}]
		})
			.success(function(threads){
				res.json(threads);
			});
	})
	.post(function(req,res) {
		if (!(req.body.title && req.body.content && req.body.username)){
			res.json({
				message : 'error',
				detail : 'please provide title and content'
			});
			return;
		}
		db.Thread.create({
			title: req.body.title
		}).complete(function(err, thread){
			db.Post.create({
				title: req.body.title,
				content: req.body.content
			}).complete(function(err, post) {
				post.setThread(thread);
				db.User.find({
					where: {
						username: req.body.username
					}
				}).complete(function(err, user) {
					if (!user) {
						res.json({ message: 'user not found' });
					} else {
						post.setUser(user);
						res.json({ message: 'success' });
					}
				})
			});
		});
	})

router.route('/thread/:id')
	.get(function(req, res) {
		var threadId = req.params.id;
		db.Thread.find({
			where: {
				id: threadId
			},
			include: [{
				model: db.Post,
				attributes: ['id', 'title', 'content', 'createdAt'],
				include: [{
					model: db.User,
					attributes: ['id','username']
				}] 
			}]
		}).then(function(thread) {
			if (!thread) {
				res.json({ message: 'error', detail: 'cannot find thread with id: ' + threadId });
			} else {
				res.json(thread);
			}
		}).error(function(err) {

		})
	});
	
router.route('/post')
	.get(function(req,res){
		db.Post.findAll()
			.success(function(posts){
				res.json(posts);
			});
	})
	.post(function(req,res){
		if (!(req.body.title && req.body.content)){
			res.json({
				message : 'error',
				detail : 'please provide title and content'
			});
			return;
		}
		db.Post.create({
			title : req.body.title,
			content: req.body.content
		}).complete(function(err, post){
			db.Thread.find({
				where: {
					id: req.body.threadid
				}
			}).complete(function(err, thread) {
				if (!thread) {
					res.json({ message: 'no thread found'});
				} else {
					post.setThread(thread);
					db.User.find({
						where: {
							id: req.body.userid
						}
					}).complete(function(err, user) {
						if (!user) {
							res.json({ message: 'no user found'});
						} else {
							post.setUser(user);
							res.json({ message: 'success'});
						}
					});
				}
			});
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
		if (!(req.body.username && req.body.password && req.body.email)) {
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
