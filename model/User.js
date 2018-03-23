const mysql = require("mysql");

module.exports.createUser = (body, callback) => {
  let sql;
  if(body.email === undefined) {
    // No Email Id
    sql = `INSERT INTO user (name, phone, username, password, type) VALUES (${mysql.escape(body.name)}, ${mysql.escape(body.phone)}, ${mysql.escape(body.username)}, ${mysql.escape(body.password)}, ${mysql.escape(body.type)})`;
  } else {
    sql = `INSERT INTO user (name, phone, email, username, password, type) VALUES (${mysql.escape(body.name)}, ${mysql.escape(body.phone)}, ${mysql.escape(body.email)}, ${mysql.escape(body.username)}, ${mysql.escape(body.password)}, ${body.type})`;  
    // sql = "INSERT INTO user (name, phone, email, username, password, type) VALUES (" + mysql.escape(body.name) + "," + mysql.escape(body.phone) +","+ mysql.escape(body.email) + "," + mysql.escape(body.username) + "," + mysql.escape(body.password) + "," + body.type + ")";
  }
  try {
    global.con.query(sql, callback);
  } catch (error) {
    console.log(`caught some error ${error}`);
  }
}

module.exports.loginByUsername = (username, password, callback) => {
  let sql =
    "SELECT username, type FROM user WHERE username = " +
    mysql.escape(username) +
    " AND password = " +
    mysql.escape(password);
  try {
    global.con.query(sql, (err, result) => {
      if(result.length !== 0) {
        let sql = `SELECT type FROM type WHERE id = ${mysql.escape(result[0].type)}`;
        try {
          global.con.query(sql, (err, type) => {
            // Adding type to the result
            result[0].type = type[0].type;
            callback(err, result);
          });
        } catch (error) {
          result = [];
          callback(error, result);        
        }
      } else {
        callback(err, result);
      }
    });
  } catch (error) {
    result = []; 
    callback(error, result);
  }
};

module.exports.getUsername = (username, callback) => {
  let sql = `SELECT name FROM user WHERE username = ${mysql.escape(username)}`;
  try {
    global.con.query(sql, callback);
  } catch (error) {
    
  }
}