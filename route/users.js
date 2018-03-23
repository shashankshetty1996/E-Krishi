const express = require('express');
const jwt = require('jsonwebtoken');

let router = express.Router();

// Models
const User = require('../model/User');

// Create User
router.get('/create', (req, res) => {
    let body = req.body;
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