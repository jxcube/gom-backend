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
    });

module.exports = router;
