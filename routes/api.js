/*
 * This is where API routes are defined.
 */

var express = require('express');
var router = express.Router();
var db = require('../models');

router.route('/user')
    /*
     * GET /user -> returns all users
     */
    .get(function(req, res) {
        db.User.findAll({
            attributes: ['username', 'email','gender']
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
    .post(function(req,res) {
        db.User.findOrCreate({
            where: { username: req.body.username },
            defaults: {
                password: req.body.password,
                email: req.body.email,
                gender: req.body.gender
            }
        }).then(function(user, created) {
            if (!created) {
                res.json({ message: 'error', detail: 'username ' + req.body.username + ' already exists' });
                return;
            }
            res.json({ message: 'success' });
        }).error(function(e) {
            console.log(e);
            res.json({ message: 'error', detail: e.errors[0].message });
        })
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

  /*
   * POST /thread
   * requires:
   *   - title
   *   - content
   *   - username
   */
  .post(function(req, res) {
    if (!(req.body.title && req.body.content && req.body.username)){
      res.json({
        message : 'error',
        detail : 'please provide title and content'
      });
      return;
    }

    db.sequelize.transaction(function(t) {
      db.Thread.create({
        title: req.body.title
      }, { transaction: t }).complete(function(err, thread){
        if (err) {
          t.rollback();
          res.json({ message: 'error', detail: 'error createing new thread' });
          return;
        }
        db.Post.create({
          title: req.body.title,
          content: req.body.content
        }, { transaction: t }).complete(function(err, post) {
          if (err) {
            t.rollback();
            res.json({ message: 'error', detail: 'error creating new post' });
            return;
          }
          post.setThread(thread);
          db.User.find({
            where: {
              username: req.body.username
            }
          }, { transaction: t }).complete(function(err, user) {
            if (err) {
              t.rollback();
              res.json({ message: 'error', detail: 'error finding user' });
            } else if (!user) {
              t.rollback();
              res.json({ message: 'error', detail: 'user not found' });
            } else {
              post.setUser(user);
              t.commit();
              res.json({ message: 'success' });
            }
          })
        });
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
      var post = null;
      var thread = null;
      var user = null;
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
        }).then(function(newthread) {
          if (!newthread) {
            t.rollback();
            res.json({ message: 'error', detail: 'there is no thread with id ' + req.params.id })
            return;
          }
          thread = newthread;
          post.setThread(thread);
          return db.User.find({
            where: {
              username: req.body.username
            }
          }, { transaction: t });
        }).then(function(theuser) {
          if (!theuser) {
            t.rollback();
            res.json({ message: 'error', detail: 'no user named ' + req.body.username });
            return;
          }
          user = theuser;
          post.setUser(user);
          t.commit();
          res.json({ message: 'success' });
        }).error(function(err) {
          t.rollback();
          res.json({ message: 'error', detail: 'there is a connection problem in our database, try again later' });
        });
    });
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
