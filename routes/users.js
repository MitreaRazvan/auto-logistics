var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//http://localhost:3000/users/add
router.post('/add', function(req, res, next) {
  var startcity = req.body.startcity;
  var address = req.body.address;
  var endcity = req.body.endcity;
  var marfa = req.body.marfa;
  var delivery = req.body.delivery;
  var driverId = req.body.driverId;
  var dateTime = req.body.dateTime;
  console.warn('add', startcity,address, endcity, delivery, marfa, driverId, dateTime);

  var curse = require('../public/data/curse.json')
  //var strPersons = fs.readFileSync('./public/data/persons.json'); o alta metoda
  //var persons = JSON.parse(strPersons); o alta metoda
  
  const id = new Date().getTime();
  curse.push({
    id,
    startcity,
    address,
    endcity,
    delivery,
    marfa,
    driverId,
    dateTime
  })
  
  var str = JSON.stringify(curse, null, 2);
  fs.writeFileSync('./public/data/curse.json', str);

  res.json({
    success: true,
    message: 'DONE!'
  });
});


module.exports = router;
