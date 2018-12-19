var ws = io.connect('https://domofons.com:8111');

var data;

ws.on("mobile_opendoor", function (data) {
    console.log(data);
})
for(let i=1; i <= 100; i++){
    //console.log(i);
    //ws = io.connect('https://domofons.com:8112');
}
function init() {
    data = {serial_number: '84005035c5043423054e'};
    //data = null;
    //data = undefined;
    ws.emit('init', data, (res) => console.log(res) );
}

function config() {
    data = {
        token: 'eESlg_EINr0jZ01GAABY',
        pub_ip: '185.22.204.74', // ip_ext
        loc_ip: '192.168.88.252', // top
        mod_ip: '192.168.88.137' // down
    };
    ws.emit('config', data, (res) => console.log(res) );
}

function key_open() {
    data = {
        key_number: '00008932E949',
        //key_number: '0000B9C62BB8',
        token: 'tbLD1gHD1ETmMQ_pAAAO'
    };
    ws.emit('domofon_key_open', data, (res) => console.log(res) );
}

function getcode() {
    data = {phone: '79046153341'};
    ws.emit('mobile_getcode', data);
}

function checkcode() {
    var code = document.getElementById('code').value;
    data = {
        phone: '79046153341',
        code: code
    };
    ws.emit('mobile_checkcode', data);
}

function auth() {
    ws.emit('mobile_auth');
}

function history() {
    data = {
        from: '',
        to: ''
    };
    ws.emit('mobile_history', data);
}

function news() {
    ws.emit('mobile_news', data);
}

function orders() {
    ws.emit('mobile_orders', data);
}

function calls() {
    ws.emit('mobile_calls', data);
}

function pass() {
    ws.emit('mobile_pass', data);
}

function opendoor() {
    ws.emit('mobile_opendoor', data);
}

function v_file() {
    data = '54007867082024240b0e_1530771111111.mp4';
    ws.emit('video_file', data, (res) => console.log(res) );
}

function c_file() {
    data = '5400786708202c3b054e_1532170111111_test.jpeg';
    ws.emit('call_file', data, (res) => console.log(res) );
}

function key_file() {
    data = {
        storage : "remote",
        filename: '5400786708202c3b054e_1542809400_TEST.jpeg'
    };
    ws.emit('domofon_key_file', data, (res) => console.log(res) );
}


ws.on('site_key_add', (data, cb) => {
    console.log(data);
    cb('done');
});

/*
//var code = document.getElementById('code').value;
var code = '188065';

var tail = code.split('');
tail = tail.map((item) => Number(item));

var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
key = key.concat(tail);
var iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ];
iv = iv.concat(tail);

// Convert text to bytes
var text = '84005035c504382e09ce';
var textBytes = aesjs.utils.utf8.toBytes(text);

var aesOfb = new aesjs.ModeOfOperation.ofb(key, iv);
var encryptedBytes = aesOfb.encrypt(textBytes);

// To print or store the binary data, you may convert it to hex
var sign = aesjs.utils.hex.fromBytes(encryptedBytes);
console.log(sign);*/


