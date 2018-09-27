let http = require('http');
let static = require('node-static');
let file = new static.Server('.');


http.createServer(function(req, res) {
    file.serve(req, res);
}).listen(3001);

console.log('Server running on port 3001');

