var net = require("net");
var fs = require("fs");

var port = 2000;

var users = [];

var server = net.createServer();

server.on("connection", function(client) {
	console.log("New user connected: " + client.remoteAddress);
	client.write("Welcome user! \n");
	for (i = 0; i < users.length; i++) {
			users[i].write(client.remoteAddress + " connected! \n");
		}
	users.push(client);
	client.on("data", function(data) {
		for (i = 0; i < users.length; i++) {
			users[i].write(client.remoteAddress + ": " + data);
		}
	})
})



server.listen(port, function() {
	console.log("Any port in a storm. (" + port + ")");

})