const express = require('express');
const jwt = require('jsonwebtoken');

let router = express.Router();

// Models
const User = require('../model/User');
const Type = require('../model/Type');

// Create User
router.post('/create', (req, res) => {
    let body = req.body;
    console.log(body);
    User.createUser(body, (err, result) => {
        if(err) {
            res.sendStatus(403);
        }
        res.send("inserted");
    });
});

// auth call from the user
router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    // typeof username === "number"
    if(!isNaN(username)) {
        // Login By Phone Number
    } else {
        // Login By Username
        User.loginByUsername(username, password, (err, result) => {
            if(err) {
                res.sendStatus(403);
            }
            if(result.length !== 0) { 
                // user found in the database 
                try {
                    jwt.sign({user:result[0].username}, 'shashank', (err, token) => {
                        if(err) {
                            res.sendStatus(403);
                        }
                        result[0].token = token;
                        result = result[0];
                        console.log(result);
                        res.send(result);
                    });
                } catch (error) {
                    res.json({username: '', type: '' });                
                }
            } else {
                res.json({username: '', type: '' });
            }
        });
    }
});

// types of users
router.get('/types', (req, res) => {
    Type.getAll((err, result) => {
        if(err) {
            res.sendStatus(403);
        }
        res.json(result);
    });
});

// Check the username
router.get('/:username', (req, res) => {
    let username = req.params.username;

    User.getUsername(username, (err, result) => {
        if(err) {
            res.sendStatus(403);
        } else if(result.length === 0) {
            res.send(`username not found`);
        } else {
            res.send(result[0].name);
        }
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