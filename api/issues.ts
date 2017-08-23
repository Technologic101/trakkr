import * as express from 'express';
import * as mongoose from 'mongoose';
import Project from '../models/project';
import Issue from '../models/issue';

let router = express.Router();

// GET single issue


// GET issues


// Create/Update issue
router.post('/', (req, res) => {
  let issue:any = new Issue();
  issue.name = req.body.name;
  issue.description = req.body.description;
  issue.assigned_to = req.body.assigned_to;
  issue.save((err, newIssue) => {
    if (err) {
      res.send(err);
    } else {
      Project.findByIdAndUpdate(req.body.project_id, { "$push": { "issues": newIssue._id }}, { "new": true, "upsert": true},
        function (err, updatedProject) {
          if (err) {
            res.send(err)
          } else {
            res.send(updatedProject);
          }
        });
      }
  });
});

router.delete('/:id', (req, res) => {

});

export default router;
