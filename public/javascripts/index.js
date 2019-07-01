var allCurse = [];

var API_URL = {
  CREATE: '...',
  READ: 'users', //data/curse.json
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
}).then(function(curse){
    console.log('curse', curse);
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
        <td>${info.driver_id}</td>
      </tr>`;
    });
    document.querySelector("#curse tbody").innerHTML = list.join('');
}



