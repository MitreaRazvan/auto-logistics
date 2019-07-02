var allCurse = [];
var allDrivers = [];

var API_URL = {
  CREATE: '...',
  READ: 'users', //data/curse.json
  READ_DRIVERS: 'drivers', //data/curse.json
  ADD: 'data/add.json',
};

var API_METHOD = {
    ADD: 'POST',
    READ:'GET',
    //ADD: 'GET',
    UPDATE: 'PUT',
    DELETE: 'DELETE'
}


fetch(API_URL.READ).then(function(r){
    return r.json()
}).then(function(orders){
    console.log('orders', orders);
    display(orders);
    //TODO - parcurgem lista de curse si generam cate un rand in tabel 
})

function display(orders) {
    console.warn(orders);
    var list = orders.map(function (info) {
        return `<tr data-id="${info.id}">
        <td>${info.startcity}</td>
        <td>${info.address}</td>
        <td>${info.endcity}</td>
        <td>${info.delivery}</td>
        <td>${info.marfa}</td>
        <td>${info.driver_id}</td>
      </tr>`;
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
          </tr>`;
      });
      document.querySelector("#drivers tbody").innerHTML = list.join('');
    }
  }
  




