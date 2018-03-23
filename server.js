const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");
const ejs = require("ejs");

// Router File
let index = require("./route/index");
let users = require("./route/users");

// Define port
let port = 3000;

// Define app
let app = express();

// Database Config
function handle() {
  var connection = mysql.createConnection({
    host: "127.0.0.1" || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "ekrishi"
  });
  connection.connect(function(err) {
    //if(err) {
    //connection.release();
    //}
    if (!err) {
      setInterval(function() {
        connection.query("show tables;");
      }, 2000);
    }
  });
  global.con = connection;
}
handle();

// View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting up static folder
app.use("/", express.static(path.join(__dirname, "public")));

// Including router to app
app.use("/", index);
app.use("/users", users);

// Error handing
app.get("*", function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

// handling 404 errors
app.use(function(err, req, res, next) {
  if (err.status !== 404) {
    return next();
  }
  // res.render("error", {
  //     err : err.message
  // });
  res.send(`
    <div style='font-size: 42;text-align: center;margin:auto'>
      <h1>Error something went wrong</h1>
      <a href="/" style='text-decoration: none;color: white;background-color: teal;padding: 10px 40px;font-size:28px;'>Go Back</a>
    </div>
  `);
});

// Server config
app.listen(port, () => console.log(`server started on port ${port}`));