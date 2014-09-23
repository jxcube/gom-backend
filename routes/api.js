var express = require('express');
var router = express.Router();
var db = require('../models');

router.route('/user')
    .get(function(req, res) {
        db.User.findAll()
            .success(function(users) {
                res.json(users);
            });
    });

module.exports = router;
