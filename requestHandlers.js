var queryString = require("querystring");
var formidable = require("formidable");
var fs = require("fs");

function start(response, req) {
	console.log("Request handler 'start' was called.");
	
	// HTML to be served
	var body = '<html>' + '<head>' + '<meta http-equiv="Content-Type" content="text/html; '
				+ 'charset = UTF-8" />'
				+ '</head>'
				+ '<body>'
				+ '<form action = "/upload" enctype="multipart/form-data" method = "post">' // <form action = URL>
				//+ '<textarea name = "text" rows = "20" cols = "60"></textarea>'
				+ '<input type="file" name="upload">'
				+ '<input type = "submit" value = "Upload File" />'
				+ '</form>'
				+ '</body>'
				+ '</html>';

	response.writeHead(200, {"Content-Type" : "text/html"}); //change text type to html, not plain
	response.write(body);
	response.end();
	
}

function upload(response, req) {
	console.log("Request handler 'upload' was called.");
	// response.writeHead(200, {"Content-Type" : "text/plain"});
	// response.write("You've sent: " + queryString.parse(postData).text);
	// response.end();
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(req, function(error, fields, files) {
		console.log("parsing done");
		fs.rename(files.upload.path, "/tmp/SFOPlaneTickets.png", function(err) {
			if(err) {
				fs.unlink("/tmp/SFOPlaneTickets.png");
				fs.rename(files.upload.path, "/tmp/SFOPlaneTickets.png");
			}
		});
		response.writeHead(200, {"Content-Type" : "text/html"});
		response.write("received image: <br/>");
		response.write("<img src='/show'/>");
		response.end();
	});

}

function show(response, req) {
	console.log("Request handler 'show' was called.");
	fs.readFile("/tmp/SFOPlaneTickets.png", "binary", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;