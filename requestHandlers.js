var queryString = require("querystring");
var formidable = require("formidable");
var url = require("url");
var path = require("path");
var fs = require("fs");

function start(res, req) {
	console.log("Request handler 'start' was called.");

	// HTML to be served
	var body = '<html>' + '<head>' + '<meta http-equiv="Content-Type" content="text/html; '
				+ 'charset = UTF-8" />'
				+ '</head>'
				+ '<body>'
				+ '<form action = "/upload" enctype="multipart/form-data" method = "post">' // <form action = URL>
				+ '<input type="file" name="upload">'
				+ '<input type = "submit" value = "Upload File" />'
				+ '</form>'
				+ '</body>'
				+ '</html>';

	res.writeHead(200, {"Content-Type" : "text/html"}); // change text type to HTML, not plain
	res.write(body);									// construct HTML in a string var
	res.end();
	
}

function upload(res, req) {
	console.log("Request handler 'upload' was called.");
	
	var form = new formidable.IncomingForm();
	// console.log("about to parse");
	form.parse(req, function(error, fields, files) {
		// console.log("parsing done");
		fs.rename(files.upload.path, "/tmp/SFOPlaneTickets.png", function(err) {
			if(err) {
				fs.unlink("/tmp/SFOPlaneTickets.png");
				fs.rename(files.upload.path, "/tmp/SFOPlaneTickets.png");
			}
		});
		res.writeHead(200, {"Content-Type" : "text/html"});
		res.write("received image: <br/>");
		res.write("<img src='/show'/>");
		res.end();
	});

}

function show(res, req) {
	console.log("Request handler 'show' was called.");

	fs.readFile("/tmp/SFOPlaneTickets.png", "binary", function(error, file) {
		if(error) {
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.write(error + "\n");
			res.end();
		} else {
			res.writeHead(200, {"Content-Type": "image/png"});
			res.write(file, "binary");
			res.end();
		}
	});
}

function file(res, req) {

	var pathname = url.parse(req.url).pathname;
	var filename = path.join(process.cwd(), pathname); //default

	fs.exists(filename, function(exists) {
		if(!exists) {
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.write("404 Not Found\n");
			res.end();
			return;
		}

		if(fs.statSync(filename).isDirectory()) {
			filename += "/HTML/login.html";
		}

		fs.readFile(filename, "binary", function(err, file) {
			if(err) {
				res.writeHead(500, {"Content-Type": "text/plain"});
				res.write(err + "\n");
				res.end();
				return;
			}

			res.writeHead(200);
			res.write(file, "binary");
			console.log("served " + filename);
			res.end();
			return;
		});

		
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.file = file;
