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

        db.User.getByEmail(req.body.email)
            .success(function(user) {
                if (!user) {
                    res.json({
                        message: 'error',
                        detail: 'User not found!'
                    });
                } else {
                    if (req.body.password !== user.password) {
                        res.json({
                            message: 'error',
                            detail: 'invalid password'
                        });
                    } else {
                        res.json({
                            message: 'success',
                            username: user.username,
                            email: user.email
                        });
                    }
                }
            }).error(function(err) {
                res.json({
                    message: 'error',
                    detail: 'Error in database connectivity'
                });
            })
    });

module.exports = router;