var ipaddress = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port      = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;

var WebSocketServer = require('ws').Server
var http = require('http');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
	response.writeHead(200, {'Content-Type': 'text/plain'});
	  response.write("Welcome to Node.js on OpenShift!\n\n");
	  response.end("Thanks for visiting us! \n");
});

server.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wss = new WebSocketServer({
    server: server,
    autoAcceptConnections: false
});
CLIENTS=[];
wss.on('connection', function(ws) {
CLIENTS.push(ws);
	console.log(ws);
  ws.on('message', function(message) {
    sendAll(message);
  });
  ws.send("NEW USER JOINED");
});
function sendAll (message) {
    for (var i=0; i<CLIENTS.length; i++) {
        CLIENTS[i].send("Message: " + message);
    }
}
console.log("Listening to " + ipaddress + ":" + port + "...");



