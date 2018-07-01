var u, b, v, r, t, l, isClient;
var url = 'https://domofons.com:8111';



var pageReady = () => {
    u = createUUID();

    b = document.getElementById('start');
    v = document.getElementById('localVideo');
    r = document.getElementById('remoteVideo');
    //t = document.getElementById('tel');

    var version = null;
    try {
        version = process.versions.electron;
    } catch (log) {
    }

    isClient = (location.pathname.indexOf('index1') != -1) ? true : false;
    console.log("client = " + isClient);

    if (version !== null/* || isClient*/) {
        v.style.display = "none";
        r.style.display = "none";
        v.volume = 1.0;
        r.volume = 1.0;
    }

    var constraints = {
        audio: true,//!isClient,
        video: true//(version === null && !isClient) ? true : false//{
        //		width: 640
        //	,	height: 480
//		,	
//		frameRate: 25
        //,	aspectRatio: 4/3
        //}
    };

    console.log(constraints);

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints).then(stream => {
            //window.stream = stream;
            l = stream;
            v.srcObject = stream;
            //muteAu(true);
            //muteVi(false);
            //
        }).catch(log);
    } else {
        log('Your browser does not support getUserMedia API');
    }
};


var newPeer = () => {
    var peerConnectionConfig = {
        iceServers: [
            {urls: 'stun:stun.l.google.com:19302'},
            {urls: 'stun:stunserver.org:3478'},
            {urls: 'stun:stun4.l.google.com:19302'},
            {urls: 'stun:stun1.l.google.com:19302'},
            {urls: 'turn:skipodev.ru:3478', 'credential': 'teledom', 'username': 'teledom'}
        ]
    };
    console.log('before pc');
    var pc = new RTCPeerConnection(peerConnectionConfig);
    console.log('after pc');
    pc.ondatachannel = e => e.channel.onclose = stop;
    pc.ontrack = e => (r.srcObject = e.streams[0]);
    pc.oniceconnectionstatechange = e => log(pc.iceConnectionState);
    pc.onicecandidate = e => e.candidate && socketio.emit("candidate", {ice: e.candidate, uuid: u});

    console.log('peerConnection: ', pc);

    return pc;
};

var pc = null;


var start = e => {
    /*if ( t.value ) {
     sendSipCall(t.value);
     t.value = "";
     return;
     }*/

    if (b.value.indexOf("Start Call") != -1) {
        b.value = "Hangup";
    } else {
        socketio.emit("hangup", {uuid: u});
        stop();
        return;
        ;
    }

    pc = newPeer();
    if (l) pc.addStream(l);

    if (e) {
        var offer_const = {
            offerToReceiveAudio: true,//isClient ? true : false,
            offerToReceiveVideo: true//isClient ? true : false,
        };
        pc.createDataChannel("close").onclose = stop;
        pc.createOffer(offer_const).then(offer => {
            console.log('offer: ', offer);
            offer.sdp = BandwidthHandler.setBandwidth(offer.sdp, 50, 256);
            //offer.sdp = BandwidthHandler.setVideoBitrates(offer.sdp, { min: 128, max: 128 });
            pc.setLocalDescription(offer).then(() => {
                socketio.emit("offer", {sdp: pc.localDescription, uuid: u});
            }).catch(log);
        }).catch(log);
    }

};

var stop = e => {
    b.value = "Start Call";
    //muteVi(false);
    r.srcObject = null;
    if (pc != null) {
        pc.close();
        pc = null;
    }
};

var socketio = io(url);

var sdpHandler = msg => pc.setRemoteDescription(new RTCSessionDescription(msg.sdp)).then(() => {
    console.log('sdpHandler msg: ', msg);
    if (msg.sdp.type == "offer") {
        pc.createAnswer().then(answer => {
            answer.sdp = BandwidthHandler.setBandwidth(answer.sdp, 50, 256);
            //answer.sdp = BandwidthHandler.setVideoBitrates(answer.sdp, { min: 128, max: 128 });
            pc.setLocalDescription(answer).then(() => {
                console.log('pc.setLocalDescription(answer): ', answer);
                socketio.emit("answer", {sdp: pc.localDescription, uuid: u})
            }).catch(log);
        }).catch(log);
    }
}).catch(log);

socketio.on("offer", msg => (pc || start(false), sdpHandler(msg)));
socketio.on("answer", msg => sdpHandler(msg));
socketio.on("candidate", msg => msg.ice && pc.addIceCandidate(new RTCIceCandidate(msg.ice)).catch(log));
socketio.on("hangup", msg => stop());
socketio.on("microphone", msg => muteAu(msg.mute));
socketio.on("video", msg => muteVi(msg.mute));

var muteAu = bool => l && (l.getAudioTracks()[0].enabled = !bool);
var muteVi = bool => l && (l.getVideoTracks()[0].enabled = !bool);


// Strictly speaking, it's not a real UUID, but it gets the job done here
function createUUID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var sendSipCall = to_number => {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url + "/tel/" + to_number, true);
    xhttp.send();
};

var log = msg => console.log(msg);//div.innerHTML += "<br>" + msg;
