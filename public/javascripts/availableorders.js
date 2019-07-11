var allorders;

var API_URL = {
    READ: 'orders/available',
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
        <a href="#" onclick='highlight(this)' class="take">&#10003</a>
        <td>
      </tr>`
    });    
document.querySelector("#orders tbody").innerHTML = list.join('');
}

function highlight(ctrl){
    var parent=ctrl.parentNode.parentNode;
    parent.style.background='#DDA0DD';
}

function clickLogin(){
console.warn("clicked on login", this);	
var lgMail = document.querySelector("[name=lgMail]").value;
var lgCar = document.querySelector("[name=lgCar]").value;
var lgPhone = document.querySelector("[name=lgPhone]").value;
window.location = 'availableorders.html';
//console.warn("Login input: ", lgMail + " " + lgCar + " " + lgPhone);
submitLogin(lgMail, lgCar, lgPhone);

function submitLogin(lgMail, lgCar, lgPhone){
    var body = JSON.stringify({lgMail, lgCar, lgPhone});
}
