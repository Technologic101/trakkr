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
    console.log('save route called');
    user_1.default.findOne({ 'id': req.body.id }, function (err, user) {
        if (err) {
            res.status(500);
            console.error(err);
        }
        if (!user) {
            user = new user_1.default(req.body);
            user.user_role = 'normal';
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
    console.log('slackAuth api route called');
    request(url, function (error, response, body) {
        if (error) {
            res.status(500);
            console.error(error);
        }
        console.log(body);
        res.send(body);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
