const express = require('express');
const jwt = require('jsonwebtoken');
const weather = require('weather-js');

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

router.get('/weather/:zipcode', verifyToken, (req, res) => {
  jwt.verify(req.token, 'shashank', (err, AuthData) => {
    if(err) {
      res.sendStatus(403);
    }
    let zipcode = req.params.zipcode;
    weather.find({search: zipcode, degreeType: 'C'}, function(err, result) {
      if(err) {
        res.sendStatus(403);
      }
      if(result.length !== 0) {
        let current = result[0].current
        let forecast = result[0].forecast;
        
        // result
        res.json({current,forecast});
      } else {
        res.json([]);
      }
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