var http = require("http"); // request http module that ships with Node.js
var url = require("url");

function start(route, handle) {

	// the function as a parameter, the only parameter we are giving to createServer()
	// this is an anoymous function, since we are defining it in the place
	// where it is needed, and no recursive calls to itself will be invoked
	// so no name needed
	// function onRequest(request, response) {
	// 	var postData = "";
	// 	var pathname = url.parse(request.url).pathname;
	// 	console.log("Request for " + pathname + " received.");

	// 	request.setEncoding("utf8");

	// 	request.addListener("data", function(postDataChunk) {
	// 		postData += postDataChunk;
	// 		console.log("Received POST data chunk " + postDataChunk + "."); // just for debugging
	// 	}) 

	// 	request.addListener("end", function() {
	// 		route(handle, pathname, response, postData); // route will take care of responding
	// 	})

	// 	// remove response functions in server
	// }

	// function of the module, which returns an object
	// http.createServer(onRequest).listen(8888); // server listening at port 8888, doing nothing else
	
	http.createServer(function(req, res) {

		// var postData = "";
		var pathname = url.parse(req.url).pathname;
		console.log("Request for " + pathname + " received.");

		// req.setEncoding("utf8");

		// req.addListener("data", function(postDataChunk) {
		// 	postData += postDataChunk;
		// 	console.log("Received POST data chunk " + postDataChunk + "."); // just for debugging
		// }) 

		// req.addListener("end", function() {
			route(handle, pathname, res, req); // route will take care of responding
		// })


	}).listen(8888);

	console.log("Server started.");
}

exports.start = start; // export the "start server" functionality to other modules


