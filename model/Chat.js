const mysql = require('mysql');

module.exports.GetChat = (sender, receiver, callback) => {
  let sql = `SELECT * FROM chats WHERE (sender = ${mysql.escape(sender)} AND receiver = ${mysql.escape(receiver)}) OR (sender = ${mysql.escape(receiver)} AND receiver = ${mysql.escape(sender)})`;

  try {
    global.con.query(sql, callback);
  } catch (error) {
    result = [];
    callback(error, result);
  }
}

module.exports.AddChat = (data, callback) => {
  let sql = `INSERT INTO chats (sender, receiver, message, time) VALUES (${mysql.escape(data.sender)}, ${mysql.escape(data.receiver)}, ${mysql.escape(data.message)}, ${mysql.escape(data.time)})`;

  try {
    global.con.query(sql, callback);
  } catch (error) {
    result = [];
    callback(error, result);
  }
};

module.exports.GetMessageByReceiver = (receiver, callback) => {
  let sql = `SELECT * FROM chats WHERE receiver = ${mysql.escape(receiver)}`;

  try {
    global.con.query(sql, callback);
  } catch (error) {
    console.log('catch it');
    result = [];
    callback(error, result);
  }
}