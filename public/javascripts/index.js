var allCurse = [];

var API_URL = {
    ADD: 'data/add.json',
    READ: 'data/curse.json'
};

var API_METHOD = {
    ADD: 'POST'
}

fetch(API_URL.READ).then(function(r){
    return r.json()
}).then(function(curse){
    console.log('curse', curse);

    //TODO - parcurgem lista de curse si generam cate un rand in tabel 
})
function display(curse){
    console.log(curse);
    const list = curse.map(function (cursele){
        return `<tr data-id="${cursele.id}">
        <td>${cursele.pornire}</td>
        <td>${cursele.destantie}</td>
        <td>${cursele.marfa}</td>
        </tr>`;
    })
    document.querySelector('#curse tbody').innerHTML = list.JSON('');
    myJSON = JSON.stringify(curse);
}

//2. function display(curse) {
    //console.warn(curse);
    //var list = curse.map(function (info) {
        //return `<tr data-id="${info.id}">
        //<td>${info.pornire}</td>
        //<td>${info.destantie}</td>
        //<td>${info.tip-marfa}</td>
      //</tr>`;
    //});
    //document.querySelector("#curse tbody").innerHTML = list.json('');
//}




