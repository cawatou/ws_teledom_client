var ws = io('http://185.22.235.182:8111');
var data;

ws.on("answer", function(data){
	console.log(data);	
})

function init(){
	 data = {
		serial_number: '84005035c504382e09ce'
	};
	ws.emit('init', data);
}

function config(){
	data = {
		serial_number: '84005035c504382e09ce'
	};
	ws.emit('config', data);
}

function key_open(){
	data = {
		key_number: '70565AD129BA'
	};
	ws.emit('key_open', data);
}

function getcode(){
	data = {
		phone: '79046153341'
	};
	ws.emit('mobile_getcode', data);
}

function checkcode(){
	var code = document.getElementById('code').value;
	data = {
		phone: '79046153341',
		code: code
	};
	ws.emit('mobile_checkcode', data);
}

function auth(){
	ws.emit('mobile_auth');
}

function history(){
	data = {
		from: '',
		to: ''
	};
	ws.emit('mobile_history', data);
}

function news(){
	ws.emit('mobile_news', data);
}

function orders(){
	ws.emit('mobile_orders', data);
}

function calls(){
	ws.emit('mobile_calls', data);
}

function pass(){
	ws.emit('mobile_pass', data);
}

function open(){
	ws.emit('mobile_opendoor', data);
}


