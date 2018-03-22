const express = require('express');
const jwt = require('jsonwebtoken');

let router = express.Router();

// auth call from the user
router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    User.getUser(username, password, (err, result) => {
        if(err) {       
            res.sendStatus(403);
        }
        if(result !== '') { 
            // user found in the database  
            try {
                jwt.sign({user:result[0].username}, 'shashank', (err, token) => {
                    result[0].token = token;
                    result = result[0];
                    console.log(result);
                    res.json(result);
                });
            } catch (error) {
                res.json({username: '', password: '', flag: 0 });                
            }
        } else {
            res.json({username: '', password: '', flag: 0 });
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