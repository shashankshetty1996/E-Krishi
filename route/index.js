const express = require('express');
const jwt = require('jsonwebtoken');

let Forum = require('../model/Forum');

let router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/channel/:channel', verifyToken, (req, res) => {
  jwt.verify(req.token, 'shashank', (err, AuthData) => {
    if(err) {
      res.sendStatus(403);
    }
    let channel = req.params.channel;
    Forum.getAllByChannel(channel, (err, result) => {
      if(err) {
        res.sendStatus(403);
      }
      res.json(result);
    })
  });
});

router.post('/channel/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'shashank', (err,AuthData) => {
    if(err) {
      res.sendStatus(403);
    }
    let data = req.body;
    Forum.addMessage(data, (err, result) => {
      if(err) {
        res.sendStatus(403);
      }
      res.send("message sent");      
    });
  });
});

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];    

  if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
  } else {      
      res.sendStatus(403);
  }
}

module.exports = router;