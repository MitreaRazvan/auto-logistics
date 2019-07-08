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

//http://localhost:3000/users/add
router.post('./add', function (req, res, next) {
  var startcity = req.body.startcity;
  var address = req.body.address;
  var endcity = req.body.endcity;
  var delivery = req.body.delivery;
  var marfa = req.body.marfa;
  var driverId = req.body.driverId;
  var dateTime = req.body.dateTime;
  
  pool.getConnection((err, connection) => {
    const sql = `INSERT INTO orders (id, startcity, address, endcity, delivery, marfa, driverId, dateTime) VALUES (NULL, '${id}', '${startcity}', '${address}', '${endcity}', '${delivery}','${marfa}', '${driverId}', '${dateTime}');`;
    console.log(sql);
    connection.query(sql, (err, result) => {
      const id = result.insertId;
      res.json({
        success: true,
        id,
        message: 'Done!'
      
      });
      connection.release();
    });
  });
});

module.exports = router;
