import * as express from 'express';
import * as mongoose from 'mongoose';
import Project from '../models/project';
import Issue from '../models/issue';

let router = express.Router();

// GET single issue


// GET issues


// Create/Update issue
router.post('/', (req, res) => {
  let issue:any;
  console.log(JSON.stringify(req.body));
  if(!req.body._id) {
    console.log('not req.body._id');
    issue = new Issue(req.body);
    issueUpdate(issue);
  } else {
    issue = Issue.findOne({'_id': req.body._id}).then( (issue:any) => {
      // update properties
      issue.name = req.body.name;
      issue.description = req.body.description;
      issue.assigned_to = req.body.assigned_to;
      issue.status = req.body.status;
      issue.due_date = req.body.due_date;
      issue.links = req.body.links;

      issueUpdate(issue);
    });
  }

  function issueUpdate (issue) {
    issue.save().then( (newIssue) => {
      console.log('From issueUpdate then function: ' + newIssue);

      // Return the parent project with its issues updated
      Project.findByIdAndUpdate(req.body.project_id, { "$addToSet": { "issues": newIssue._id }}, { "new": true })
      .populate('issues')
      .exec( (err, updatedProject) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).send(updatedProject);
      });
    }).catch( (err) => {
      console.log(err);
      res.status(500).send(err);
    });
  }

});

router.delete('/:id', (req, res) => {

});

export default router;
