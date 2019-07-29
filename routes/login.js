var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'logistics'
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next){
  const email = req.body.email;
  const phone = req.body.phone;
  const car = req.body.car;

  pool.getConnection((err, connection) => {
    const sql = `SELECT * FROM drivers WHERE phone="${phone}" AND email="${email}" AND carNumber="${car}"`;
     
    console.log(sql)
    connection.query(sql, (err, results) => {
      res.json(results);
      connection.release();
    });
  });
});


 module.exports = router;