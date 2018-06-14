var ws = io.connect('http://185.22.235.182:8111');
var data;

function init() {
    data = {serial_number: '84005035c504382e09ce'};
    ws.emit('init', data, (res) => console.log(res) );
}

function config() {
    data = {token: 'Gs1codN2NLFFxQMF-lD_yNU-rfkI70XH'};
    ws.emit('config', data, (res) => console.log(res) );
}

function key_open() {
    data = {
        key_number: '70565AD129BA',
        token: 'Gs1codN2NLFFxQMF-lD_yNU-rfkI70XH'
    };
    ws.emit('key_open', data, (res) => console.log(res) );
}

function getcode() {
    data = {
        phone: '79046153341'
    };
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
