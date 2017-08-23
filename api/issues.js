"use strict";
var express = require("express");
var project_1 = require("../models/project");
var issue_1 = require("../models/issue");
var router = express.Router();
router.post('/', function (req, res) {
    var issue = new issue_1.default();
    issue.name = req.body.name;
    issue.description = req.body.description;
    issue.assigned_to = req.body.assigned_to;
    issue.save(function (err, newIssue) {
        if (err) {
            res.send(err);
        }
        else {
            project_1.default.findByIdAndUpdate(req.body.project_id, { "$push": { "issues": newIssue._id } }, { "new": true, "upsert": true }, function (err, updatedProject) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(updatedProject);
                }
            });
        }
    });
});
router.delete('/:id', function (req, res) {
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
