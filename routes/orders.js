var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET orders listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
