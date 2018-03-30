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

module.exports.UpdatePost = (id, data, callback) => {
  let sql = `UPDATE post SET username = ${mysql.escape(data.username)}, name = ${mysql.escape(data.name)}, description = ${mysql.escape(data.description)}, price = ${mysql.escape(data.price)} WHERE id = ${id}`;

  try {
    global.con.query(sql, callback);
  } catch (error) {
    let result = [];
    callback(result, error);
  }
}

module.exports.DeletePost = (id, callback) => {
  let sql = `DELETE FROM post WHERE id = ${id}`;

  try {
    global.con.query(sql, callback);
  } catch (error) {
    let result = [];
    callback(result, error);
  }
}