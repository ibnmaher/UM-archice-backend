const mysql = require("mysql2");
require("dotenv").config();

let db = mysql.createPool({
  host: "localhost",
  user: "taha",
  database: "archive",
  password: process.env.PASSWORD,
  dateStrings: true,
});

module.exports = db;
