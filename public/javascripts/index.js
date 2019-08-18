var allOrders;
var allDrivers;
var editordersId;

var API_URL = {
  CREATE: 'orders',
  READ: 'orders', //data/orders.json
  READ_DRIVERS: 'drivers', //data/orders.json
  ADD: 'orders/add',
  ADD: 'drivers/add',
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
    allOrders = orders;
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
        <td>${info.items}</td>
        <td>${info.driverId}</td>
        <td>${info.dateTime}</td>
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
            <td>${data.email}</td>
            <td>${data.driver}</td>
            <td>${data.carNumber}</td>
            <td>${data.phone}</td>
            <td>${data.dateTime}</td>
          </tr>`;
    });

    document.querySelector("#drivers tbody").innerHTML = list.join('');
  }
}

function saveOrders() {
  var startcity = document.querySelector('[name=startcity]').value;
  var address = document.querySelector('[name=address]').value;
  var endcity = document.querySelector('[name=endcity]').value;
  var delivery = document.querySelector('[name=delivery]').value;
  var items = document.querySelector('[name=items]').value;
  var driverId = document.querySelector('[name=driverId]').value;
  var dateTime = document.querySelector('[name=dateTime]').value;
  console.log(saveOrders);
  if (submitNewOrders) {
    submitNewOrders(startcity, address, endcity, delivery, items, driverId, dateTime);
  }
}
function submitNewOrders(startcity, address, endcity, delivery, items, driverId, dateTime) {
  var body = null;
  const method = API_METHOD.ADD;
  if (method === 'POST') {
    body = JSON.stringify({
      startcity,
      address,
      endcity,
      delivery,
      items,
      driverId,
      dateTime
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
    if (status.success) {
      console.warn('saved!', status);
      inlineAddOrders(startcity, address, endcity, delivery, items, driverId, dateTime);
    } else {
      console.warn('not saved!', status);
    }
  });
}

function inlineAddOrders(startcity, address, endcity, delivery, items, driverId, dateTime) {
  allOrders.push({
    startcity,
    address,
    endcity,
    delivery,
    items,
    driverId,
    dateTime
  });
  display(allOrders);
}

function saveDrivers() {
  var email = document.querySelector('[name=email]').value;
  var driver = document.querySelector('[name=driver]').value;
  var carNumber = document.querySelector('[name=carNumber]').value;
  var phone = document.querySelector('[name=phone]').value;
  var dateTime = document.querySelector('[name=dateTime]').value;
  console.log(saveDrivers);
  if (submitNewDrivers) {
    submitNewDrivers(email, driver, carNumber, phone, dateTime);
  }
}

function submitNewDrivers(email, driver, carNumber, phone, dateTime) {
  var body = null;
  const method = API_METHOD.ADD;
  if (method === 'POST') {
    body = JSON.stringify({ email, driver, carNumber, phone, dateTime });
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
    if (status.success) {
      console.warn('saved!', status);
      inlineAddDrivers(email, driver, carNumber, dateTime);
    } else {
      console.warn('not saved!', status);
    }
  });
  function inlineAddDrivers(email, driver, carNumber, dateTime) {
    allDrivers.push({ email, driver, carNumber, dateTime });
    display(allDrivers);
  }
};