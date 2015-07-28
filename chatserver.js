var net = require("net");
var fs = require("fs");

var port = 2000;

var users = [];

var server = net.createServer(function(connection) {
	var msgAll = function msgAll(message, sender) {
		users.forEach(function(user) {
			if (user === sender) {

			} else {
				user.write(message);
			}
		console.log(message.toString());
		})
	}

	connection.name = connection.remoteAddress;
	users.push(connection);

	connection.write("Welcome " + connection.name + "\n");
	msgAll(connection.name + " joined \n", connection);

	connection.on("data", function(data) {
		if (data.toString().indexOf("/yell") != -1) {
			msgAll(connection.name + ": " + data.toString().replace(/\/yell/g, "").toUpperCase(), connection);
		} else if (data.toString().indexOf("/name") != -1) {
			connection.name = data.toString().replace(/\/name/g, "");
		} else {
			msgAll(connection.name + ": " + data, connection);
		}

	})

	connection.on("end", function () {
		users.splice(users.indexOf(connection), 1);
		msgAll(connection.name + " left \n");

	})
});


server.listen(port, function() {
	console.log("Any port in a storm. (" + port + ")");

})