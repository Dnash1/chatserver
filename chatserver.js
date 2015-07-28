var net = require("net");
var fs = require("fs");

var port = 2000;

var server = net.createServer(function(connection) {
	console.log("user connected");
})


server.listen(port, function() {
	console.log("Any port in a storm. (" + port + ")");

})