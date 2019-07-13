var allorders;

var API_URL = {
    READ: 'orders/myorders',
    UPDATE: 'orders/update'
};

var API_METHOD = {
    READ: 'GET',
    UPDATE: 'PUT'
}

if (document.querySelector("#orders tbody")){
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
        <td>${info.dateTime}</td>
        <td>
        <a href=" #" onclick='highlight(this)' class="take">&#10003</a>
        <td>
      </tr>`
    });    
document.querySelector("#orders tbody").innerHTML = list.join('');
}

