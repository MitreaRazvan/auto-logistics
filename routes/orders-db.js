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

router.get('/', function (req, res, next) {
  pool.getConnection((err, connection) => {
    const sql = `SELECT * FROM orders`;
    connection.query(sql, (err, results) => {
      res.json(results);
      connection.release();
    });
  });
});

router.post('/available', function (req, res, next) {
  const userId = req.body.userId;
  pool.getConnection((err, connection) => {
    const sql = `SELECT * FROM orders WHERE (driverId is null OR (driverId = ${userId} AND dateTime = 0))`;
    connection.query(sql, (err, results) => {
      res.json(results);
      connection.release();
    });
  });
});

router.post('/add', function (req, res, next) {
  const start = req.body.startcity;
  const address = req.body.address;
  const end = req.body.endcity;
  const delivery = req.body.delivery;
  const items = req.body.items;
  const dateTime = req.body.dateTime;
  pool.getConnection((err, connection) => {
    console.log(err);
    const sql = `INSERT INTO orders (startcity, address, endcity, delivery, items, dateTime) VALUES ?`;
    const values = [
      [start, address, end, delivery, items, dateTime]
    ];
    connection.query(sql, [values], (err, results) => {
      console.log(err);
      console.log(sql);
      res.json(results);
      connection.release();
    });
  });
});

module.exports = router;
