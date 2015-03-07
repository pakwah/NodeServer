var queryString = require("querystring");
var url = require("url");
var path = require("path");
var fs = require("fs");

function static(res, req, fileName) {

	var fileDir = path.join(process.cwd(), fileName); //default

	var contentTypesByExtension = {
		".html" : "text/html",
		".css" : "text/css",
		".js" : "text/javascript"
	};

	fs.exists(fileDir, function(exists) {
		if(!exists) {
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.write("404 Not Found\n");
			res.end();
			return;
		}

		if(fs.statSync(fileDir).isDirectory()) {
			fileDir += "/HTML/index.html";
		}

		fs.readFile(fileDir, "binary", function(err, file) {
			if(err) {
				res.writeHead(500, {"Content-Type": "text/plain"});
				res.write(err + "\n");
				res.end();
				return;
			}

			// valid file
			var headers = {};
			var contentType = contentTypesByExtension[path.extname(fileDir)];

			if(contentType) {
				headers["Content-Type"] = contentType;
			}

			res.writeHead(200, headers);
			res.write(file, "binary");
			console.log("served " + fileDir);
			res.end();
			return;
		});

		
	});
}

function mainpage(res, req) {
	static(res, req, "");
}

function login(res, req) {
	static(res, req, "/HTML/login.html");
}

function file(res, req) {
	static(res, req, url.parse(req.url).pathname);
}

exports.mainpage = mainpage;
exports.login = login;
exports.file = file;