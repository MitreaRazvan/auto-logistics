var allCurse;
var allDrivers;
var editCurseId;

var API_URL = {
  CREATE: 'users',
  READ: 'users', //data/curse.json
  READ_DRIVERS: 'drivers', //data/curse.json
  ADD: 'users/add',
  UPDATE:'users/update',
  DELETE:'users/delete'
};


var API_METHOD = {
  CREATE:'POST',
    READ:'GET',
    ADD:'POST',
    //ADD: 'GET',
    UPDATE:'PUT',
    DELETE:'DELETE'
}


fetch(API_URL.READ).then(function(r){
    return r.json()
}).then(function(curse){
    console.log('curse', curse);
    allCurse = curse;
    display(curse);
    //TODO - parcurgem lista de curse si generam cate un rand in tabel 
})

function display(curse) {
    console.warn(curse);
    var list = curse.map(function (info) {
        return `<tr data-id="${info.id}">
        <td>${info.startcity}</td>
        <td>${info.address}</td>
        <td>${info.endcity}</td>
        <td>${info.delivery}</td>
        <td>${info.marfa}</td>
        <td>${info.driverId}</td>
        <td>${info.dateTime}</td>
      </tr>`
    });
    document.querySelector("#curse tbody").innerHTML = list.join('');
}


fetch(API_URL.READ_DRIVERS).then(function(r){
  return r.json()
}).then(function(response){
  drivers.display(response);
})

const drivers = {
  display: function(drivers){
      var list = drivers.map(function(data){
        return `<tr data-id="${data.id}">
            <td>${data.driver}</td>
            <td>${data.carNumber}</td>
            <td>${data.phone}</td>
            <td>${data.dateTime}</td>
            <td>${data.actions}</td>
          </tr>`;
      });
      
      document.querySelector("#drivers tbody").innerHTML = list.join('');  
    }
  }
  
  function saveCurse(){
    var startcity = document.querySelector('[name=startcity]').value;
    var address = document.querySelector('[name=address]').value;
    var endcity = document.querySelector('[name=endcity]').value;
    var delivery = document.querySelector('[name=delivery]').value;
    var marfa = document.querySelector('[name=marfa]').value;
    var driverId = document.querySelector('[name=driverId]').value;
    var dateTime = document.querySelector('[name=dateTime]').value;
    
  if (submitNewCurse){
    submitNewCurse(startcity,address, endcity, delivery, marfa, driverId, dateTime);
  }
}

function submitNewCurse(startcity,address, endcity, delivery, marfa, driverId, dateTime){
  console.warn('submitNewCurse', startcity,address, endcity, delivery, marfa, driverId, dateTime);
  var body = null;
  const method = API_METHOD.ADD;
  if(method === 'POST'){
    body = JSON.stringify({
      startcity: startcity,
      address: address,
      endcity: endcity,
      delivery: delivery,
      marfa: marfa,
      driverId: driverId,
      dateTime: dateTime
    });
  }
  fetch(API_URL.ADD, {
    method,
    body,
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function(r){
    return r.json();
  }).then(function(status){
    if (status.succes){
      console.warn('saved!', status);
      inlineAddPerson(startcity,address, endcity, delivery, marfa, driverId, dateTime);
    } else {
      console.warn('not saved!', status);
    }
  })
}

function inlineAddPerson(startcity,address, endcity, delivery, marfa, driverId, dateTime){
  allCurse.push({
      startcity: startcity,
      address: address,
      endcity: endcity,
      delivery: delivery,
      marfa: marfa,
      driverId: driverId,
      dateTime: dateTime
  });
  display(allCurse);
}