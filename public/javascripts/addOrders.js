//API_URL/METHOD
var API_URL = {
  DELETE: 'addOrders/delete',
  CREATE: 'orders',
  READ: 'orders',
  ADD: 'addOrders/add',
  UPDATE: 'orders/update',
};


var API_METHOD = {
  ADD: 'POST',
  UPDATE: 'PUT',
  DELETE: 'DELETE'
  //CREATE: 'POST',
  //READ: 'GET',
  //ADD: 'GET',
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

//DISPLAY ORDERS 
function display(orders) {
  console.warn(orders);
  var list = orders.map(function (info) {
    if(info.id > 50)
      return `<tr data-id="${info.id}"> 
      <td>${info.startcity}</td>
      <td>${info.address}</td>
      <td>${info.endcity}</td>
      <td>${info.delivery}</td>
      <td>${info.items}</td>
      <td><a herf="#" onclick='deleteOrder(this)' class="delete">&#10060</a><td>
      </tr>`
    });
    document.querySelector("#orders tbody").innerHTML = list.join('');
  }

//ADD ORDERS
function addOrders() {
  var startcity = document.querySelector('[name=startcity]').value;
  var address = document.querySelector('[name=address]').value;
  var endcity = document.querySelector('[name=endcity]').value;
  var delivery = document.querySelector('[name=delivery]').value;
  var items = document.querySelector('[name=items]').value;
  console.log(addOrders);
  if (submitAddOrders) {
    submitAddOrders(startcity, address, endcity, delivery, items);
  }
}
function submitAddOrders(startcity, address, endcity, delivery, items) {
  var body = null;
  const method = API_METHOD.ADD;
  if (method === 'POST') {
    body = JSON.stringify({
      startcity,
      address,
      endcity,
      delivery,
      items,
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
      inlineAddOrders(startcity, address, endcity, delivery, items);
    } else {
      console.warn('not saved!', status);
    }
  });
}

function inlineAddOrders(startcity, address, endcity, delivery, items) {
  allOrders.push({ startcity, address, endcity, delivery, items });
};

//DELETE ORDERS
function inlineDeleteOrders(orderId) {
  console.warn('please refresh', orderId)
  allOrders = allOrders.filter(function (info) {
    return info.id != orderId;
  });
  display(allOrders);
};

function deleteOrder(link) {
  var tr = link.parentNode.parentNode
  var orderId = tr.getAttribute('data-id');
  console.log(orderId);
  let body = null;
  const method = API_METHOD.DELETE;
  if (method === "DELETE") {
    body = JSON.stringify({ orderId });
    console.log('orderId', orderId);
  };


  fetch(API_URL.DELETE, {
    method,
    body,
    headers: { "Content-Type": "application/json" }
  }).then(function (r) {
    return r.json();
  }).then(function (status) {
    if (status.success) {
      inlineDeleteOrders(orderId);
    } else {
      console.warn('not removed', status);
    }

  });
};

function LogOut() {
  window.location = 'loginPeople.html'
  if (localStorage.clear()) {
      alert('required');
  }
}

function goHome(){
  window.location = 'startpage.html'
  if (localStorage.clear()) {
    alert('required');
}
}