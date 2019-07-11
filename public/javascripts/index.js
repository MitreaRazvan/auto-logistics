var allorders;
var allDrivers;
var editordersId;

var API_URL = {
  CREATE: 'orders',
  READ: 'orders', //data/orders.json
  READ_DRIVERS: 'drivers', //data/orders.json
  ADD: 'orders/add',
  UPDATE: 'orders/update',
  DELETE: 'orders/delete'
};


var API_METHOD = {
  CREATE: 'POST',
  READ: 'GET',
  ADD: 'POST',
  //ADD: 'GET',
  UPDATE: 'PUT',
  DELETE: 'DELETE'
}

if (document.querySelector("#orders")) {
  fetch(API_URL.READ).then(function (r) {
    return r.json()
  }).then(function (orders) {
    console.log('orders', orders);
    allorders = orders;
    display(orders);
  })
}

function display(orders) {
  console.warn(orders);
  var list = orders.map(function (info) {
    return `<tr data-id="${info.id}">
        <td>${info.startcity}</td>
        <td>${info.address}</td>
        <td>${info.endcity}</td>
        <td>${info.delivery}</td>
        <td>${info.marfa}</td>
        <td>${info.driverId}</td>
        <td>${info.dateTime}</td>
        <td>
        <a href="#" class="take">&#10003</a>
        <td>
      </tr>`
  });
  document.querySelector("#orders tbody").innerHTML = list.join('');
}


if (document.querySelector("#drivers")) {
  fetch(API_URL.READ_DRIVERS).then(function (r) {
    return r.json()
  }).then(function (response) {
    drivers.display(response);
  })
}

const drivers = {
  display: function (drivers) {
    var list = drivers.map(function (data) {
      return `<tr data-id="${data.id}">
            <td>${data.driver}</td>
            <td>${data.carNumber}</td>
            <td>${data.phone}</td>
            <td>${data.dateTime}</td>
          </tr>`;
    });

    document.querySelector("#drivers tbody").innerHTML = list.join('');
  }
}

function saveorders() {
  var startcity = document.querySelector('[name=startcity]').value;
  var address = document.querySelector('[name=address]').value;
  var endcity = document.querySelector('[name=endcity]').value;
  var delivery = document.querySelector('[name=delivery]').value;
  var marfa = document.querySelector('[name=marfa]').value;
  var driverId = document.querySelector('[name=driverId]').value;
  var dateTime = document.querySelector('[name=dateTime]').value;

  if (submitNeworders) {
    submitNeworders(startcity, address, endcity, delivery, marfa, driverId, dateTime);
  }
}

function submitNeworders(startcity, address, endcity, delivery, marfa, driverId, dateTime) {
  console.warn('submitNeworders', startcity, address, endcity, delivery, marfa, driverId, dateTime);
  var body = null;
  const method = API_METHOD.ADD;
  if (method === 'POST') {
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
  }).then(function (r) {
    return r.json();
  }).then(function (status) {
    if (status.succes) {
      console.warn('saved!', status);
      inlineAddPerson(startcity, address, endcity, delivery, marfa, driverId, dateTime);
    } else {
      console.warn('not saved!', status);
    }
  })
}

function inlineAddPerson(startcity, address, endcity, delivery, marfa, driverId, dateTime) {
  allorders.push({
    startcity: startcity,
    address: address,
    endcity: endcity,
    delivery: delivery,
    marfa: marfa,
    driverId: driverId,
    dateTime: dateTime
  });
  display(allorders);
}