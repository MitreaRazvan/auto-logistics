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
    const sql = `SELECT * FROM myorders`;
      connection.query(sql, (err, results) => {
        res.json(results);
        connection.release();
    });
  });
});

router.get('/accept-order', function(req, res, next) {
  pool.getConnection((err, connection) => {
    const sql = `INSERT INTO myorders`;
      connection.query(sql, (err, results) => {
        res.redirect('/myorders');
        connection.release();
    });
  });
});

module.exports = router;
