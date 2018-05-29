var sc = io('https://skipodev.ru:8011');
var peerConnectionConfig = {
  'iceServers': [
    {'urls': 'stun:stun.l.google.com:19302'},
    //{'urls': 'turn:185.22.235.182:3478', 'credential': 'teledom', 'username': 'teledom'}
  ]
};
var uuid, pc, channel;

function createPC(isOffer) {
	uuid = createUUID();
	pc = new RTCPeerConnection(peerConnectionConfig);
	console.log('createPC: ', pc);
	
	// send any ice candidates to the other peer
	pc.onicecandidate = function (e) {
		console.log('onicecandidate', e.candidate);
		if(e.candidate != null) sc.emit("candidate", { ice: e.candidate, uuid: uuid });
	};

	pc.onconnection = function() {
		console.log('Connection established');
	};
	pc.onclosedconnection = function() {
		console.log('Disconnected');
	};

	if(isOffer) {
		openOfferChannel(pc);
		createOffer(pc);
	} else {
		openAnswerChannel(pc);
	}
}

sc.on('candidate', function(data) {
	console.log(data.ice);
	// добавляем пришедший ICE-кандидат
	if(data.ice && pc.remoteDescription) pc.addIceCandidate(new RTCIceCandidate(data.ice));
});

function openOfferChannel(pc) {
	// Первый параметр – имя канала, второй - настройки.
	channel = pc.createDataChannel('RTCDataChannel', {});
	console.log('openOfferChannel', channel);
	setChannelEvents();
}

function setChannelEvents() {
	
	channel.onopen = function() {
		console.log('Channel opened');
	};
	channel.onclose = function() {
		console.log('Channel closed');
	};
	channel.onerror = function(err) {
		console.log('Channel error:', err);
	};
	channel.onmessage = function(e) {
		console.log(e);
		console.log('Incoming message:', e.data);
	};
	console.log('setChannelEvents', channel);
}

function createOffer(pc) {
	pc.createOffer(function(offer) {
		pc.setLocalDescription(offer, function() {
			console.log('setLocalDescription', pc);
			console.log('send offer: ', offer);
			// Отправляем другому участнику через сигнальный сервер
			sc.emit("offer", { sdp: pc.localDescription, uuid: uuid });
			// После завершения этой функции начнет срабатывать событие pc.onicecandidate
		}, function(err) {
			console.log('Failed to setLocalDescription():', err);
		});
	}, function(err) {
		console.log('Failed to createOffer():', err);
	});
}

function setRemoteSDP(msg) {
	console.log('setRemoteSDP', msg);

	pc.setRemoteDescription(new RTCSessionDescription(msg.sdp), function() {
		console.log('setRemoteDescription', pc);
		if(pc.remoteDescription.type == 'offer') {
			createAnswer();
		}
	}, function(err) {
		console.log('Failed to setRemoteDescription():', err);
	});
}

sc.on('offer', function(sdp) {
	console.log('Пришел Offer от другого участника', sdp);
	if(!pc) {
		// Пришел Offer от другого участника
		createPC(false);
	}
	setRemoteSDP(sdp);
});

function openAnswerChannel(pc) {
	console.log('openAnswerChannel', pc);
	pc.ondatachannel = function(e) {
		channel = e.channel;
		setChannelEvents();
	};
}

function createAnswer() {
	console.log('createAnswer');
	pc.createAnswer(function(offer) {
		pc.setLocalDescription(offer, function() {
			// Отправляем другому участнику через сигнальный сервер
			sc.emit("answer", { sdp: pc.localDescription, uuid: uuid })
		}, function(err) {
			console.log('Failed to setLocalDescription():', err);
		});
	}, function(err) {
		console.log('Failed to createAnswer():', err);
	});
}

sc.on("answer", function(data){
	setRemoteSDP(data);	
})

function send(text){
	console.log('send()');
	channel.send("Hi there!");
	//console.log('pc: ', pc, 'channel: ', channel);
}

// Strictly speaking, it's not a real UUID, but it gets the job done here
function createUUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var log = msg => console.log(msg);//div.innerHTML += "<br>" + msg;

