const mysql = require('mysql');

module.exports.GetUserPost = (username, callback) => {
  let sql = `SELECT * FROM post WHERE username = ${mysql.escape(username)}`;
  try {
    global.con.query(sql,callback);
  } catch (error) {
    let result = [];
    callback(result, error);
  }
}

module.exports.AddPost = (data, callback) => {
  let sql = `INSERT INTO post (username, name, description, price) VALUES (${mysql.escape(data.username)}, ${mysql.escape(data.name)}, ${mysql.escape(data.description)}, ${mysql.escape(data.price)})`;

  try {
    global.con.query(sql, callback);
  } catch (error) {
    let result = [];
    callback(result, error);
  }
}