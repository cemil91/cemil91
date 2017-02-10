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
var clients = {};
wss = new WebSocketServer({
    server: server,
    autoAcceptConnections: false
});

wss.on('connection', function(ws) {
  var id = Math.round(Math.random()*50);
  clients[id] = ws;
  console.log("новое соединение " + id);
	
  ws.on('message', function(message) {
       console.log('получено сообщение ' + message);

    //for (var key in clients) {
      //
	 clients[message].send("salam" +message);
   // }
  });
  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });
});

console.log("Listening to " + ipaddress + ":" + port + "...");



