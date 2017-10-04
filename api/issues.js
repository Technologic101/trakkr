"use strict";
var express = require("express");
var project_1 = require("../models/project");
var issue_1 = require("../models/issue");
var router = express.Router();
router.post('/', function (req, res) {
    var issue;
    console.log(JSON.stringify(req.body));
    if (!req.body._id) {
        console.log('not req.body._id');
        issue = new issue_1.default(req.body);
        issueUpdate(issue);
    }
    else {
        issue = issue_1.default.findOne({ '_id': req.body._id }).then(function (issue) {
            issue.name = req.body.name;
            issue.description = req.body.description;
            issue.assigned_to = req.body.assigned_to;
            issue.status = req.body.status;
            issue.due_date = req.body.due_date;
            issueUpdate(issue);
        });
    }
    function issueUpdate(issue) {
        issue.save().then(function (newIssue) {
            console.log('From issueUpdate then function: ' + newIssue);
            project_1.default.findByIdAndUpdate(req.body.project_id, { "$addToSet": { "issues": newIssue._id } }, { "new": true })
                .populate('issues')
                .exec(function (err, updatedProject) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(400).send(updatedProject);
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
    }
});
router.delete('/:id', function (req, res) {
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
