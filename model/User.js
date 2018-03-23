const mysql = require("mysql");

module.exports.loginByUsername = (username, password, callback) => {
  let sql =
    "SELECT username, type FROM user WHERE username = " +
    mysql.escape(username) +
    " AND password = " +
    mysql.escape(password);
  try {
    global.con.query(sql, (err, result) => {
      if(result.length !== 0) {
        let sql = "SELECT type FROM type WHERE id = " + mysql.escape(result[0].type);
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

