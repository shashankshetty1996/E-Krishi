const mysql = require('mysql');

module.exports.getAllByChannel = (channel, callback) => {
  // let sql = `SELECT * FROM (SELECT TOP (30) * FROM forum ORDER BY id DESC) ORDER BY id Asc`;
  let sql = `SELECT * FROM forum WHERE channel = ${mysql.escape(channel)}`;
  try {
    global.con.query(sql, callback);
  } catch (error) {
    result = [];
    callback(error, result);
  }
}


module.exports.addMessage = (body, callback) => {
  let sql = `INSERT INTO forum (channel, username, message, time) VALUES (${mysql.escape(body.channel)}, ${mysql.escape(body.username)}, ${mysql.escape(body.message)}, ${mysql.escape(body.time)})`;
  try {
    global.con.query(sql, callback);
  } catch (error) {
    result = [];
    callback(error, result);
  }
}