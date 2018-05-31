var ws = io('https://skipodev.ru:8011');

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
	setRemoteSDP(data);	
})