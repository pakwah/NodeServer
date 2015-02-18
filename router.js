function route(handle, pathname, response, req) {
	console.log("About to route request for " + pathname + ".");

	if(typeof handle[pathname] === 'function') { // "===" operator
		handle[pathname](response, req);
	} else {
		console.log("No request handler found for " + pathname + ".");
		response.writeHead(404, {"Content-Type" : "text/plain"});
		response.write("404 not found");
		response.end();
	}
}

exports.route = route;