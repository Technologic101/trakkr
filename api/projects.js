"use strict";
var express = require("express");
var project_1 = require("../models/project");
var router = express.Router();
router.get('/:id', function (req, res) {
    project_1.default.findById(req.params['id']).populate('issues').then(function (project) {
        res.json(project);
    }).catch(function (err) {
        res.status(500);
        console.error(err);
    });
});
router.get('/', function (req, res) {
    project_1.default.find().then(function (projects) {
        res.json(projects);
    }).catch(function (err) {
        res.status(500);
        console.error(err);
    });
});
router.post('/', function (req, res) {
    var project = new project_1.default(req.body);
    project.save().then(function (project) {
        res.json(project);
    }).catch(function (err) {
        res.status(500).send();
        console.error(err);
    });
});
router.delete('/:id', function (req, res) {
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
