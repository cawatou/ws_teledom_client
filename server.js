const HTTPS_PORT    = 8011;
const express       = require('express');
const app           = express();
var   fs            = require('fs');
const server        = require('https').createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app);
var   io            = require('socket.io')(server);

server.listen(HTTPS_PORT, '95.183.10.70', function() {
    console.log('listening on https://localhost:' + HTTPS_PORT);
});

app.use(express.static('./'));
