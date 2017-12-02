"use strict";
var express = require("express");
var project_1 = require("../models/project");
var issue_1 = require("../models/issue");
var router = express.Router();
router.post('/', function (req, res) {
    var issue;
    console.log(JSON.stringify(req.body));
    if (!req.body._id) {
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
            issue.links = req.body.links;
            issueUpdate(issue);
        });
    }
    function issueUpdate(issue) {
        issue.save().then(function (newIssue) {
            console.log('From issueUpdate then function: ' + newIssue);
            console.log(newIssue.project);
            project_1.default.findByIdAndUpdate(newIssue.project, { "$addToSet": { "issues": newIssue._id, "issueOrder": newIssue._id } }, { "new": true })
                .populate('issues').exec(function (err, updatedProject) {
                if (err) {
                    res.status(500).send(err);
                }
                console.log('Updated Project: ' + JSON.stringify(updatedProject));
                res.status(200).send(updatedProject);
            });
        });
    }
});
router.delete('/:id', function (req, res) {
    issue_1.default.findOneAndRemove(req.body.id, function (err, doc) {
        err && res.status(500).send(err);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
