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

wss.on('connection', function(ws)
{
var id = Math.round(Math.random()*100000);
clients[id] = ws;
console.log("Новое соединение " + id);
ws.send("token:"+id);	
data = "";
	
for(var k in clients){data += k+":";}
	
ws.on('message', function(message) 	      
{
var res = message.split(":");
	
         if(res[0] == "pong"){	
console.log('pong'+res[1]);
		 
if(data.indexOf(res[1]) === -1)data += res[1]+":";
	

                               }
	
 if(message == "listele"){	
for(var key in clients) 
{

if(clients[key].readyState === clients[key].OPEN)clients[key].send("liste:"+data);
}
console.log('Получено сообщение ' + message);
                               }
	

	
	 if(res[0] == "teklif"){	

if(clients[res[1]].readyState === clients[res[1]].OPEN)clients[res[1]].send("teklif:"+res[2]);

console.log('Получено сообщение ' + message);
                               }
	
	 if(res[0] == "qebulolundu"){	

if(clients[res[1]].readyState === clients[res[1]].OPEN)clients[res[1]].send("qebulolundu:"+res[2]);

console.log('Получено сообщение ' + message);
                               }
	
	 if(res[0] == "oyna"){	

if(clients[res[1]] != undefined){if(clients[res[1]].readyState === clients[res[1]].OPEN)clients[res[1]].send("oyna:"+res[2]);}

console.log('Получено сообщение ' + message);
                               }	
	
});

	      
	              
ws.on('close', function() {
console.log('Соединение закрыто ' + id);
delete clients[id];
data = "";
	for(var k in clients){data += k+":";}
});
function ping()	{
	
	console.log('ping');
for(var key in clients) 
{

//if(clients[key].readyState === clients[key].OPEN)clients[key].send("ping");
	console.log(key);
}
               
}
	setInterval(ping, 5000); 
	
});

console.log("Listening to " + ipaddress + ":" + port + "...");



