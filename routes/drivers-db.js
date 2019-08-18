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
    const sql = `SELECT * FROM drivers`;
      connection.query(sql, (err, results) => {
        res.json(results);
        connection.release();
    });
  });
});

router.post('/add', function (req, res, next) {
  const email = req.body.email;
  const driver = req.body.driver;
  const carNumber = req.body.carNumber;
  const phone = req.body.phone;
  const dateTime = req.body.dateTime;
  pool.getConnection((err, connection) => {
    console.log(err);
    const sql = `INSERT INTO drivers (email, driver, carNumber, phone, dateTime) VALUES ?`;
    const values = [
      [email, driver, carNumber, phone, dateTime]
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
