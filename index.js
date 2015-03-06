var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};			// handle is an object whose fields are different URLs holding different
							// corresponding handling functions
							// i.e. a collection of functions
							
handle["/"] = requestHandlers.file;		
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload; 
handle["/show"] = requestHandlers.show;
handle["/file"] = requestHandlers.file;

server.start(router.route, handle);