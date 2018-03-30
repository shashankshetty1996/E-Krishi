const express = require('express');
const jwt = require('jsonwebtoken');

let router = express.Router();

// Models
const User = require('../model/User');
const Type = require('../model/Type');
const Post = require('../model/Post');

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
router.get('/username/:username', (req, res) => {
    let username = req.params.username;

    User.getUsername(username, (err, result) => {
        if(err) {
            res.sendStatus(403);
        } else if(result.length === 0) {
            res.send(`username not found`);
        } else {
            // removing email option if not given by the user
            if(result[0].email === "dummy@gmail.com") {
                delete result[0].email;
            }
            res.send(result[0]);
        }
    });
});

// Add Post
router.post('/post', verifyToken, (req, res) => {
    console.log('hello');
    jwt.verify(req.token, 'shashank', (err, AuthData) => {
        if(err) {
            res.sendStatus(403);
        }
        let data = req.body;
        Post.AddPost(data, (err, result) => {
            if(err) {
                res.sendStatus(403);
            }
            if(result.affectedRows === 0) {
                res.send('invalid');
            } else {
                res.send(result);
            }
        });
    });
});

// Get post by username
router.get('/post/:username', verifyToken, (req, res) => {
    jwt.verify(req.token, 'shashank', (err, AuthData) => {
        if(err) {
            res.sendStatus(403);
        }
        let username = req.params.username;
        Post.GetUserPost(username, (err, result) => {
            if(err) {
                res.sendStatus(403);
            }
            if(result.length !== 0) {
                res.send(result);
            } else {
                res.send('invalid');
            }
        });
    });
});

// Update post
router.put('/post/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'shashank', (err, AuthData) => {
        if(err) {
            res.sendStatus(403);
        }
        let id = req.params.id;        
        let data = req.body;
        Post.UpdatePost(id, data, (err, result) => {
            if(err) {
                res.sendStatus(403);
            }
            if(result.affectedRows === 0) {
                res.send("invalid");
            } else {
                res.send(result);
            }
        });
    });
}); 

// Delete Post
router.delete('/post/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'shashank', (err, AuthData) => {
        if(err) {
            res.sendStatus(403);
        }
        let id = req.params.id;
        Post.DeletePost(id, (err, result) => {
            if(err) {
                res.sendStatus(403);
            }
            if(result.affectedRows === 0) {
                res.send("invalid");
            } else {
                res.send(result);
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