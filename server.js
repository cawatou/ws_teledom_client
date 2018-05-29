const HTTPS_PORT = 8011;
const express = require('express');
const app = express();
const fs = require('fs');
const server = require('https').createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app);
var io = require('socket.io')(server);

server.listen(HTTPS_PORT, '0.0.0.0', function() {
   console.log('listening on https://localhost:'+HTTPS_PORT);
});


io.on('connection', function (client) {
    console.log('new connection: ' + client.id);

    client.on('offer', function (details) {
        client.broadcast.emit('offer', details);
        console.log('offer, ' + details.uuid + ': ' + JSON.stringify(details));
    });

    client.on('answer', function (details) {
        client.broadcast.emit('answer', details);
        console.log('answer, ' + details.uuid + ': '  + JSON.stringify(details));
    });

    client.on('candidate', function (details) {
        client.broadcast.emit('candidate', details);
        console.log('candidate, ' + details.uuid + ': ' + JSON.stringify(details));
    });

    client.on('hangup', function (details) {
        client.broadcast.emit('hangup', details);
        console.log('hangup: ' + JSON.stringify(details));
    });

    client.on('message', function (details) {
        client.broadcast.emit('message', details);
        console.log('message: ' + JSON.stringify(details));
    });

});

app.use(express.static('./'));
