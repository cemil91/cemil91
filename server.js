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
var data;
var clients = {};
wss = new WebSocketServer({
    server: server,
    autoAcceptConnections: false
});

wss.on('connection', function(ws) {
  var id = Math.round(Math.random()*1000000000);
  clients[id] = ws;
  console.log("новое соединение " + id);
	ws.send("token:"+id);
  ws.on('message', function(message) {
	  for (var k in clients) 
	  {
		 if(data != undefined)data = data+k; 
	  }
	for (var key in clients)  
	{
		clients[key].send(data);
	}
//var res = message.split("x");
       //console.log('получено сообщение ' + message);
//if(res[2] == "reg")
//if(res[2] == "mesaj")clients[res[0]].send(" "+res[1]);  
//
 
});
  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    
	  clients[id] = "";
  });
});

console.log("Listening to " + ipaddress + ":" + port + "...");



