/*
 * This is where API routes are defined.
 */

var express = require('express');
var router = express.Router();
var db = require('../models');

//
// USER
//

router.route('/user')
    /*
     * GET /user -> returns all users
     */
    .get(function(req, res) {
        db.User.findAll({
            attributes: ['id', 'username', 'email','gender']
        }).then(function(users) {
            res.json(users);
        }).error(function(e) {
            res.json({ message: 'error', detail: e.message });
        });
    })

    /*
     * POST /user -> creates new user
     * requires:
     *   - username
     *   - password
     *   - email
     *   - gender
     */
    .post(function(req, res) {
        db.User.findOrCreate({
            where: { username: req.body.username },
            defaults: {
                password: req.body.password,
                email: req.body.email,
                gender: req.body.gender
            }
        }).then(function(user, created) {
            if (!created) {
                throw new Error('username ' + req.body.username + ' already exists');
            }
            res.json({ message: 'success' });
        }).error(function(e) {
            res.json({ message: 'error', detail: e.message });
        })
    });

router.route('/user/:id')
    /*
     * GET /user/{id} -> get a single user by id
     */
    .get(function(req, res) {
        if (!parseInt(req.params.id)) {
            res.json({ message: 'error', detail: 'id of /user/:id should be integer' });
            return;
        }
        db.User.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'username', 'email', 'gender']
        }).then(function(user) {
            if (!user) {
                res.json({ message: 'error', detail: 'no user found with id ' + req.params.id });
                return;
            }
            res.json(user);
        }).error(function(e) {
            res.json({ message: 'error', detail: e.message });
        })
    });

//
// END USER
//

//
// ITEM
//

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
    });

router.route('/item/random')
    /*
     * GET /item/random -> returns one single random item
     */
    .get(function(req, res) {
        db.Item.getRandom(function(err, item) {
            if (err) {
                res.json({ message: error, detail: err.message });
                return;
            }
            res.json(item);
      });
    });

router.route('/item/:id')
    /*
     * GET /item/{id} -> returns one single item with given id
     */
    .get(function(req, res) {
        if (!parseInt(req.params.id)) {
            res.json({ message: 'error', detail: 'id of /item/:id should be integer' });
            return;
        }
        db.Item.findOne({
            where: { id: req.params.id }
        }).then(function(item) {
            if (!item) {
                res.json({ message: 'error', detail: 'no item found with id ' + req.params.id });
                return;
            }
            res.json(item);
        }).error(function(e) {
            res.json({ message: 'error', detail: e.message });
        })
    });

//
// END ITEM
//

//
// THREAD
//

router.route('/thread')
    /*
     * GET /thread -> returns all threads
     */
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
        }).then(function(threads){
            res.json(threads);
        }).error(function(e) {
            res.json({ message: 'error', detail: e.message });
        });
    })

    /*
     * POST /thread
     * requires:
     *   - title
     *   - content
     *   - username
     */
    .post(function(req, res) {
        db.sequelize.transaction(function(t) {
            var user, thread, post;
            db.User.findOne({
                where: { username: req.body.username }
            }, { transaction: t })
            .then(function(theuser) {
                if (!theuser) {
                    throw new Error('no user found with username ' + req.body.username);
                }
                user = theuser;
                return db.Thread.create({
                    title: req.body.title
                }, { transaction: t });
            }).then(function(newthread) {
                thread = newthread;
                return db.Post.create({
                    title: req.body.title,
                    content: req.body.content
                });
            }).then(function(newpost) {
                post = newpost;
                post.setUser(user);
                post.setThread(thread);
                return t.commit();
            }).then(function() {
                res.json({ message: 'success' });
            }).error(function(e) {
                t.rollback().then(function() {
                    res.json({ message: 'error', detail: e.message });
                });
            })
        });
    });

router.route('/thread/:id')
    /*
     * GET /thread/{id} -> returns one single thread
     */
    .get(function(req, res) {
        if (!parseInt(req.params.id)) {
            res.json({ message: 'error', detail: 'id of /thread/:id should be integer' })
            return;
        }
        db.Thread.findOne({
            where: {
                id: req.params.id
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
                throw new Error('cannot find thread with id: ' + req.params.id);
            }
            res.json(thread);
        }).error(function(e) {
            res.json({ message: 'error', detail: e.message });
        })
    })

    /*
     * POST /thread/{id}
     * requires:
     *   - title
     *   - content
     *   - username
     */
    .post(function(req, res) {
        if (!(req.body.title && req.body.content && req.body.username)) {
            res.json({ message: 'error', detail: 'please provide complete information' });
            return;
        }
        db.sequelize.transaction(function(t) {
            var post, thread, user;
            db.Post.create({
                title: req.body.title,
                content: req.body.content
            }, { transaction: t })
            .then(function(newpost) {
                post = newpost;
                return db.Thread.find({
                    where: {
                        id: req.params.id
                    }
                }, { transaction: t });
            }).then(function(thethread) {
                if (!thethread) {
                    throw new Error('there is no thread with id ' + req.params.id);
                }
                thread = thethread;
                post.setThread(thread);
                return db.User.findOne({
                    where: {
                        username: req.body.username
                    }
                }, { transaction: t });
            }).then(function(theuser) {
                if (!theuser) {
                    throw new Error('no user found with username' + req.body.username);
                }
                user = theuser;
                post.setUser(user);
                return t.commit();
            }).then(function() {
                res.json({ message: 'success' });
            }).error(function(e) {
                t.rollback().then(function() {
                    res.json({ message: 'error', detail: e.message });
                });
            });
        });
    });

//
// END THREAD
//

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
