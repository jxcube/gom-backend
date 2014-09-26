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
    
    // POST /api/user -> create new user
    .post(function(req,res) {
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

module.exports = router;
