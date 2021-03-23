var http = require("http")
var fs = require("filesystem")

var server = http.createServer(function (req, res) {
    switch(req.method){
        case "GET":
            fs.readFile("/index.html", function(error, data){
                res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"})
                res.send(data)
                res.end()
            })                
            break;
        case: "POST":
            
            break;
    }
    console.log(JSON.stringify(req.headers, null, 5));
})
server.listen(3000, function () { console.log("OK") })
