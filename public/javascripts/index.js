var allOrders;
var allDrivers;
var editordersId;

//API_URL/METHOD
var API_URL = {
  CREATE: 'orders',
  READ: 'orders', //data/orders.json
  READ_DRIVERS: 'drivers', //data/orders.json
  ADD: 'orders/add',
  ADD_DRIVERS: 'drivers/add',
  UPDATE: 'orders/update',
  DELETE: 'orders/delete'
};


var API_METHOD = {
  CREATE: 'POST',
  READ: 'GET',
  ADD: 'POST',
  ADD_DRIVERS:'POST',
  //ADD: 'GET',
  UPDATE: 'PUT',
  DELETE: 'DELETE'
}

//CONNECTION ORDERS
if (document.querySelector("#orders")) {
  fetch(API_URL.READ).then(function (r) {
    return r.json()
  }).then(function (orders) {
    console.log('orders', orders);
    allOrders = orders;
    display(orders);
  })
}

//DISPAY ORDERS
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

//CONNECTION DRIVERS
if (document.querySelector("#drivers")) {
  fetch(API_URL.READ_DRIVERS).then(function (r) {
    return r.json()
  }).then(function (response) {
    drivers.display(response);
  })
}

//DISPLAY DRIVERS
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

//SAVE ORDERS
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

  //CONNECTION DB-ORDERS
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

//SAVE DRIVERS
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
  const method = API_METHOD.ADD_DRIVERS;
  if (method === 'POST') {
    body = JSON.stringify({ email, driver, carNumber, phone, dateTime });
  }
  //CONNECTION DB-DRIVERS
  fetch(API_URL.ADD_DRIVERS, {
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

//STARTPAGE BUTTON-DROPDOWN
function dropdown(){
  const click = document.getElementById("dropcontent");
  if(click.style.display == "none"){
    click.style.display = "block";
  }else{
    click.style.display = "none";
  }
}
function dropdown1(){
  const click = document.getElementById("dropcontent1");
  if(click.style.display == "none"){
    click.style.display = "block";
  }else{
    click.style.display = "none";
  }
}
function dropdown2(){
  const click = document.getElementById("dropcontent2");
  if(click.style.display == "none"){
    click.style.display = "block";
  }else{
    click.style.display = "none";
  }
}