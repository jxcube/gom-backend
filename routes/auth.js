var express = require('express');
var router = express.Router();
var db = require('../models');

router.route('/login')
    .post(function(req, res) {
        if (!(req.body.email && req.body.password)) {
            res.json({
                message: 'error',
                detail: 'please provide complete information'
            })
            return;
        }

        db.User.findOne({
            where: { email: req.body.email }
        }).then(function(user) {
            if (!user) {
                throw new Error('no user found with email ' + req.body.email);
            } else {
                if (req.body.password !== user.password) {
                    throw new Error('invalid password');
                }
                res.json({
                    message: 'success',
                    username: user.username,
                    email: user.email
                });
            }
        }).error(function(e) {
            res.json({ message: 'error', detail: e.message })
        })
    });

module.exports = router;