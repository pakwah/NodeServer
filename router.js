function route(handle, pathname, res, req) {
	console.log("About to route request for " + pathname + ".");

	// This works when pathname is an action
	// if(typeof handle[pathname] === 'function') {						// "===" operator
	// 	handle[pathname](res, req);
	// } else 

	if(typeof handle[pathname] === 'function') { // pathname is an action
		handle[pathname](res, req);
	} else if(String(pathname).indexOf("/HTML") || 
			  String(pathname).indexOf("/CSS")) { // pathname is a static file
		handle["/file"](res, req);
	} else {
		console.log("No request handler found for " + pathname + ".");
		res.writeHead(404, {"Content-Type" : "text/plain"});
		res.write("404 not found");
		res.end();
	}
}

exports.route = route;