"use strict";
var express = require("express");
var request = require("request");
var user_1 = require("../models/user");
var router = express.Router();
router.get('/:id', function (req, res) {
});
router.get('/', function (req, res) {
    user_1.default.find().then(function (users) {
        res.json(users);
    }).catch(function (err) {
        res.status(500);
        console.error(err);
    });
});
router.post('/', function (req, res) {
    user_1.default.findOne({ 'id': req.body.id }).then(function (user) {
        if (!user) {
            user.user_role = 'normal';
            user = new user_1.default(req.body);
            user.save().then(function (user) {
                var tok = user.generateJWT();
                res.json({ token: tok });
            });
        }
        else {
            var tok = user.generateJWT();
            res.json({ token: tok });
        }
    });
});
router.post('/slackAuth', function (req, res) {
    var url = "https://slack.com/api/oauth.access?client_id=" + process.env.CLIENT_ID + "&client_secret=" + process.env.CLIENT_SECRET + "&code=" + req.body.code;
    request(url, function (error, response, body) {
        if (error) {
            res.status(500);
            console.error(error);
        }
        res.send(body);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
