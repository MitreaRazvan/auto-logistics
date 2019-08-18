var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'logistics'
});

router.post('/add', function (req, res, next) {
  const start = req.body.startcity;
  const address = req.body.address;
  const end = req.body.endcity;
  const delivery = req.body.delivery;
  const items = req.body.items;
  pool.getConnection((err, connection) => {
    console.log(err);
    const sql = `INSERT INTO orders (startcity, address, endcity, delivery, items) VALUES ?`;
    const values = [
      [start, address, end, delivery, items]
    ];
    connection.query(sql, [values], (err, results) => {
      console.log(err);
      console.log(sql);
      res.json(results);
      connection.release();
    });
  });
});

router.delete('/delete', function (req, res, next) {
  const id = req.body.orderId;
  pool.getConnection((err, connection) => {
    const sql = `DELETE FROM orders WHERE id = ${id}`;
    connection.query(sql, (err, results) => {
      res.json({
        success: true,
        message: 'Done!'
      });
      connection.release()
    });
  });
});
module.exports = router;
