const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const ejs = require('ejs');

// Router File
let index = require('./route/index');
let users = require('./route/users');

// Define port
let port = 3000;

// Define app
let app = express();

// View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting up static folder
app.use("/", express.static(path.join(__dirname, "public")));

// Including router to app
app.use('/', index);
app.use('/users', users);

// Server config
app.listen(port, () => console.log(`server started on port ${port}`));