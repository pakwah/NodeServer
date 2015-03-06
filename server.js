var http = require("http");					// request http module that ships with Node.js
var url = require("url");

function start(route, handle) {

	// the function as a parameter, the only parameter we are giving to createServer()
	// this is an anoymous function, since we are defining it in the place
	// where it is needed, and no recursive calls to itself will be invoked
	// so no name needed
	
	http.createServer(function(req, res) {

		var pathname = url.parse(req.url).pathname;
		console.log("Request for " + pathname + " received.");

		route(handle, pathname, res, req);	// route will take care of responding
		
	}).listen(8888);						// listens at port 8888

	console.log("Server started.");
}

exports.start = start;						// export the "start server" functionality to other modules


