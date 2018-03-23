const mysql = require('mysql');

module.exports.getAll = (callback) => {
  let sql = "SELECT * FROM type";
  global.con.query(sql, callback);
}