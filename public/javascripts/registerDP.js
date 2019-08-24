var allDrivers;
var allPeople;

var API_URL = {
  LOGIN: 'login',
  READ: 'people',
  ADD_PEOPLE: 'people/add',
  READ_PEOPLE: 'people',
  READ_DRIVERS: 'drivers', //data/orders.json
  ADD_DRIVERS: 'drivers/add'
};

var API_METHOD = {
  LOGIN: 'POST',
  CREATE: 'POST',
  READ_PEOPLE: "READ",
  ADD_PEOPLE: 'POST',
  ADD_DRIVERS: 'POST'
};

//REGISTER-DRIVERS
function clickRegister() {
  var email = document.querySelector('[name=email]').value;
  var driver = document.querySelector('[name=driver]').value;
  var phone = document.querySelector('[name=phone]').value;
  var carNumber = document.querySelector('[name=carNumber]').value;
  var dateTime = document.querySelector('[name=dateTime]').value;
  console.log(clickRegister);
  submitNewDrivers(email, driver, carNumber, phone, dateTime);
};

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
    headers: { "Content-Type": "application/json" }
  }).then(function (r) {
    return r.json();
  }).then(function (status) {
    if (status.success) {
      console.warn('saved!', status);
      inlineAddDrivers(email, driver, carNumber, phone, dateTime);
    } else {
      console.warn('not saved!', status);
    }
  });
  function inlineAddDrivers(email, driver, carNumber, phone, dateTime) {
    allDrivers.push({ email, driver, carNumber, phone, dateTime });
    display(allDrivers);
  }
};


if (document.querySelector("#people")) {
  fetch(API_URL.READ).then(function (r) {
    return r.json()
  }).then(function (people) {
    console.log('people', people);
    allPeople = people;
  })
}

//!!!!!LOGIN - PEOPLE !!!!!!

function clickLogin() {
  console.warn("clicked on login", this);
  var lgMail = document.querySelector("[name=lgMail]").value;
  var password = document.querySelector("[name=password]").value;
  if (lgMail == '') {
    alert('required');
    return false;
  }
  submitLogin(lgMail, password);
};

function submitLogin(email, password) {
  console.warn("Submit Login got data: ", email + " " + password);
  let body = null;
  const method = API_METHOD.LOGIN;
  if (method === "POST") {
    body = JSON.stringify({ email, password });
  }
  //login fetch
  fetch(API_URL.LOGIN, {
    method, body, headers: { "Content-Type": "application/json" }
  }).then(function (resp) {
    return resp.json()
  }).then(function (loginData) {
    console.log("login input", loginData);
    lgData = loginData;
    if (loginData && loginData.length > 0) {
      const user = loginData[0];
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      window.location = 'addOrders.html';
      localStorage.clear();
    }
  });
};

//REGISTER-PEOPLE
function clickPeople() {
  var email = document.querySelector('[name=email]').value;
  var password = document.querySelector('[name=password]').value;
  console.log(clickPeople);
  if (submitNewPeople) {
    submitNewPeople(email, password);
  };
};
function submitNewPeople(email, password) {
  console.warn("submit Login got data: ", email + " " + password)
  var body = null;
  const method = API_METHOD.ADD_PEOPLE;
  if (method === 'POST') {
    body = JSON.stringify({ email, password });
  }

  //CONNECTION DB-PEOPLE
  fetch(API_URL.ADD_PEOPLE, {
    method,
    body,
    headers: { "Content-Type": "application/json" }
  }).then(function (r) {
    return r.json();
  }).then(function (status) {
    if (status.success) {
      console.warn('saved!', status);
      inlineAddPeople(email, password);
    } else {
      window.location = 'addOrders.html';
      localStorage.clear();
      console.warn('not saved!', status);
    }
  });
  function inlineAddPeople(email, password) {
    allPeople.push({ email, password });
    display(allPeople);
  }
};
