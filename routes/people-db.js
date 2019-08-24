var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'logistics'
});

router.get('/', function (req, res, next) {
    pool.getConnection((err, connection) => {
      const sql = `SELECT * FROM people`;
      connection.query(sql, (err, results) => {
        res.json(results);
        connection.release();
      });
    });
  });

  router.post('/add', function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    pool.getConnection((err, connection) => {
      console.log(err);
      const sql = `INSERT INTO people (email, password) VALUES ?` ;
      const values = [[email, password]];
      connection.query(sql, [values], (err, results) => {
        console.log(err);
        console.log(sql);
        res.json(results);
        connection.release();
      });
    });
  });
  router.post('/', function(req, res, next){
    const email = req.body.email;
    const password = req.body.password;
    pool.getConnection((err, connection) => {
      const sql = `SELECT * FROM people WHERE email="${email}" AND password="${password}"`;
      console.log(sql)
      connection.query(sql, (err, results) => {
        res.json(results);
        connection.release();
      });
    });
  });
  module.exports = router;