import * as express from 'express';
import * as mongoose from 'mongoose';
import Issue from '../models/issue';
import Project from '../models/project';

let router = express.Router();

// GET single project
router.get('/:id', (req, res) => {
  Project.findById(req.params['id']).populate('issues').then((project) => {
    res.json(project);
  }).catch((err) => {
      res.status(500);
      console.error(err);
  });
});

// GET projects
router.get('/', (req, res) => {
  Project.find().then((projects)=>{
    res.json(projects);
  }).catch((err) => {
      res.status(500);
      console.error(err);
  });
});

// Create/Update project
router.post('/', (req, res) => {
  let project = new Project(req.body);
  project.save().then( (project) => {
    res.json(project);
  });
});

router.delete('/:id', (req, res) => {
  /*let projectId = new mongodb.ObjectID(req.params['id']);
  database.db.collection('projects').remove({_id:projectId}).then(()=> {
    res.sendStatus(200);
  });*/
});

export default router;
