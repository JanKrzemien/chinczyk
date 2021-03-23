var http = require("http")

var server = http.createServer(function (req, res) {
    console.log(JSON.stringify(req.headers, null, 5));
})
server.listen(3000, function () { console.log("OK") })