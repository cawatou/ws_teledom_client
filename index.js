var ws = io('http://185.22.235.182:8111');

ws.on('candidate', function(data) {
	console.log(data.ice);
	// добавляем пришедший ICE-кандидат
	if(data.ice && pc.remoteDescription) pc.addIceCandidate(new RTCIceCandidate(data.ice));
});

ws.on('offer', function(sdp) {
	console.log('Пришел Offer от другого участника', sdp);
	if(!pc) {
		// Пришел Offer от другого участника
		createPC(false);
	}
	setRemoteSDP(sdp);
});

ws.on("answer", function(data){
	console.log(data);	
})

function init(){
	var data = {
		event: 'init',
		serial_number: '84005035c504382e09ce'
	};
	ws.emit('init', data);
}

function config(){
	var data = {
		event: 'config',
		serial_number: '84005035c504382e09ce'
	};
	ws.emit('config', data);
}
function key_open(){
	var data = {
		event: 'key_open',
		key_number: '70565AD129BA'
	};
	ws.emit('key_open', data);
}
function getcode(){
	var data = {
		event: 'mobile_getcode',
		phone: '79046153341'
	};
	ws.emit('mobile_getcode', data);
}
function checkcode(){
	var code = document.getElementById('code').value;
	var data = {
		event: 'mobile_checkcode',
		phone: '79046153341',
		code: code
	};
	ws.emit('mobile_checkcode', data);
}

