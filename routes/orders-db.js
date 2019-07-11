var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'logistics'
});

/* GET users listing. */

router.get('/', function(req, res, next) {
  pool.getConnection((err, connection) => {
    const sql = `SELECT * FROM orders`;
      connection.query(sql, (err, results) => {
        res.json(results);
        connection.release();
    });
  });
});

router.get('/available', function(req, res, next) {
  pool.getConnection((err, connection) => {
    // (driverId is null or driverId = 5)
    const sql = `SELECT * FROM orders WHERE driverId is null`;
      connection.query(sql, (err, results) => {
        res.json(results);
        connection.release();
    });
  });
});

module.exports = router;
