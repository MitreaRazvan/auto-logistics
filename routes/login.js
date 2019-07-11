var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'logistics'
});

 // GET /READ entire "spots" listed.  http://localhost:3000/get
router.get('/', function(req, res, next) {
  //  res.send('respond with a resource');
  pool.getConnection((err, connection) => {
    const sql = `SELECT * FROM orders WHERE driverId is null`;
     connection.query(sql, (err, results) => {
        res.json(results);
        connection.release();
    });
  });
});

 module.exports = router;