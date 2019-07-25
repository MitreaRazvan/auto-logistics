var allorders;

var API_URL = {
    READ: 'orders/available',
    LOGIN: 'login',
    TAKE: 'orders/take',
    FINISH:'orders/finish',
    UPDATE: 'orders/update'
};

var API_METHOD = {
    READ: 'POST',
    LOGIN:'POST',
    TAKE: 'PUT',
    FINISH:'PUT',
    UPDATE: 'PUT'
}

if (true || location.host === "mitrearazvan.github.io") {
    API_URL.READ = 'data/orders.json';
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function loadOrders() {
    const user = getUser();
    const userId = user.id;
    let body = null;
    const method = API_METHOD.READ;
    if(method === "POST"){
        body = JSON.stringify({userId});
    }

    fetch(API_URL.READ, {
        method,
        body,
        headers: {"Content-Type": "application/json"}
    }).then(function (r) {
        return r.json()
    }).then(function (orders) {
        console.log('orders', orders);
        allorders = orders;
        display(orders);
    })
}

if (document.querySelector("#orders tbody")) {
    if (localStorage.getItem('user')) {
        loadOrders();
    } else {
        window.location = 'login.html';
    }
}


function display(orders) {
    console.warn(orders);
    const userId = getUser().id;
    var list = orders.map(function (info) {
        var style = info.driverId == userId ? 'style="background: #DDA0DD"' : '';
        return `<tr data-id="${info.id}" ${style}>
        <td>${info.startcity}</td>
        <td>${info.address}</td>
        <td>${info.endcity}</td>
        <td>${info.delivery}</td>
        <td>${info.items}</td>
        <td>${info.dateTime}</td>
        <td>
        <a href="#" onclick='takeOrder(this)' class="take">&#x1F69A</a>
        <a herf="#" onclick='finishOrder(this)' class="take1">&#x274C</a>

        <td>
      </tr>`
    });    
    document.querySelector("#orders tbody").innerHTML = list.join('');
}

function finishOrder(link){
    var userId = getUser().id;
    var tr = link.parentNode.parentNode;
    var orderId = tr.getAttribute('data-id');
    console.warn(orderId, userId);
    let body = null;
    const method = API_METHOD.FINISH;
    if(method === "PUT"){
        body = JSON.stringify({orderId, userId});
        console.log('userId', userId);  
    };

    fetch(API_URL.FINISH, {
        method,
        body,
        headers: {"Content-Type": "application/json"}
    }).then(function (r) {
        return r.json();
    }).then(function (status) {
        loadOrders();
    });
};


function submitOrder(orderId) {
    var userId = getUser().id;
    console.warn(orderId, userId);
    let body = null;
    const method = API_METHOD.TAKE;
    if(method === "PUT"){
        body = JSON.stringify({orderId, userId});
        console.log('userId', userId);  
    };

    fetch(API_URL.TAKE, {
        method,
        body,
        headers: {"Content-Type": "application/json"}
    }).then(function (r) {
        return r.json();
    }).then(function (status) {
        loadOrders();
    });
};

function takeOrder(link) {
    var tr = link.parentNode.parentNode;
    var id = tr.getAttribute('data-id');
    if(function finishOrder(){
        var id = tr.getAttribute('data-id'); 
        console.log(finishOrder);
        finishOrder(id);
    })
    submitOrder(id);
};


function clickLogin(){
    console.warn("clicked on login", this);	
    var lgMail = document.querySelector("[name=lgMail]").value;
    var lgCar = document.querySelector("[name=lgCar]").value;
    var lgPhone = document.querySelector("[name=lgPhone]").value;
    if(lgMail==''){
        alert('required');
        return false;
    }    
    submitLogin(lgMail, lgCar, lgPhone);
};  

function submitLogin(email, car, phone){
    console.warn("Submit Login got data: ", phone + " " + email + " " + car);
    
    let body = null;
    const method = API_METHOD.LOGIN;
    if(method === "POST"){
        body = JSON.stringify({email, phone, car});
    }
    //login fetch
    fetch(API_URL.LOGIN,{
        method, body, headers: {"Content-Type": "application/json"}
    }).then(function(resp){
        return resp.json()
    }).then(function(loginData){
        console.log("login input", loginData);
        lgData = loginData;
        if(loginData && loginData.length > 0) {
            const user = loginData[0];
            localStorage.setItem('user', JSON.stringify(user));
            window.location = 'availableorders.html';
        } else {
            console.warn('invalid tandala!');
            localStorage.clear();
        }
    })
}


