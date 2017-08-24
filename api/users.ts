import * as express from 'express';
import * as mongoose from 'mongoose';
import * as request from 'request';
import User from '../models/user';

let router = express.Router();

// GET single user
router.get('/:id', (req, res) => {
  /*let userId = new mongodb.ObjectID(req.params['id']);
  User.findById(userId).then((user)=> {
    res.json(user);
  });*/
});

// GET users
router.get('/', (req, res) => {

  User.find().then((users)=> {
      res.json(users);
  }).catch((err) => {
      res.status(500);
      console.error(err);
  })
});

// Create/Update user and save token
router.post('/', (req, res) => {
  console.log('save route called');
  User.findOne({'id': req.body.id}, (err, user:any) => {

    if (err) {
      res.status(500);
      console.error(err);
    }

    if (!user) {
      user = new User(req.body);
      user.user_role = 'normal';
      user.save().then( (user) => {
        let tok = user.generateJWT();
        res.json({token: tok});
      });
    } else {
      let tok = user.generateJWT();
      res.json({token: tok});
    }
  });
});

// Authenticate with Slack
router.post('/slackAuth', (req, res) => {
  let url = "https://slack.com/api/oauth.access?client_id=" + process.env.CLIENT_ID + "&client_secret=" + process.env.CLIENT_SECRET + "&code=" + req.body.code;
  console.log('slackAuth api route called');

  request(url, function(error, response, body) {
    if (error) {
      res.status(500);
      console.error(error);
    }

    console.log(body);
    res.send(body);
  });
});


export default router;
