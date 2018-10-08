var ws = io.connect('https://domofons.com:8112');
var data;

ws.on("mobile_opendoor", function (data) {
    console.log(data);
})
for(let i=1; i <= 100; i++){
    //console.log(i);
    //ws = io.connect('https://domofons.com:8112');
}
function init() {
    data = {serial_number: '5400786708200c22098e'};
    //data = null;
    //data = undefined;
    ws.emit('init', data, (res) => console.log(res) );
}

function config() {
    data = {
        token: 'QOgWr0OhmM9riDv9AAAA',
        pub_ip: 'test',
        loc_ip: 'test',
        mod_ip: 'test'
    };
    ws.emit('config', data, (res) => console.log(res) );
}

function key_open() {
    data = {
        key_number: 'tttteeesst', // Шифровать
        token: 'QOgWr0OhmM9riDv9AAAA'
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
    data = '5400786708202c3b054e_1532170111111_0051.jpeg';
    ws.emit('call_file', data, (res) => console.log(res) );
}

function write_key() {
    console.log('write_key');
    data = {
        time: 60
    };
    ws.emit('domofon_key_write', data, (res) => console.log(res) );


    data = {
        socket_id: 'jsOrIxBEiZQ4L0IDADT5',
        number: 'WRITEKEY'
    };
    ws.emit('domofon_key_add', data);
}


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


