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
})