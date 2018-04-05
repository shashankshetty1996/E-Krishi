const express = require('express');
const jwt = require('jsonwebtoken');
const weather = require('weather-js');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('16c103b7c34a4c0aa1ff3cbd0753fab6');

let Forum = require('../model/Forum');
let Chat = require('../model/Chat');

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

router.get('/chat/sender=:sender&receiver=:receiver', verifyToken, (req, res) => {
  jwt.verify(req.token, 'shashank', (err, AuthData) => {
    if(err) {
      res.sendStatus(403);
    }
    let sender = req.params.sender;
    let receiver = req.params.receiver;

    Chat.GetChat(sender, receiver, (err, result) => {
      if(err) {
        res.sendStatus(403);
      } else {
        res.send(result);
      }
    });
  });
});

router.post('/chat/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'shashank', (err, AuthData) => {
    if(err) {
      res.sendStatus(403);
    }
    let data = req.body;
    Chat.AddChat(data, (err, result) => {
      if(err) {
        res.sendStatus(403);
      } else {
        res.send('message sent');
      }
    });
  });
});

router.get('/chat/receiver=:receiver', verifyToken, (req, res) => {
  jwt.verify(req.token, 'shashank', (err, AuthData) => {
    if(err) {
      res.sendStatus(403);
    }
    let receiver = req.params.receiver;

    Chat.GetMessageByReceiver(receiver, (err, result) => {
      if(err) {
        res.sendStatus(403);
      }
      if(result.length === 0) {
        res.send('blank');
      } else {
        res.send(result);
      }
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

// Fetch from NEWS API
router.get('/news', verifyToken, (req, res) => {
  jwt.verify(req.token, 'shashank', (err,AuthData) => {
    if(err) {
      res.sendStatus(403);
    }
    newsapi.v2.everything({
      sources: 'bbc-news,the-verge,google-news,the-hindu,the-times-of-india',
      q: 'crop,agriculture,weather'
    }).then(response => {
      // success full request
      if(response.status === "ok") {
        // All the articles send as result
        res.json(response.articles);
      } else {
        res.sendStatus(403);
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