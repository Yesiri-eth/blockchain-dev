let http = require('http');

http.createServer(function (req, res) {
  res.write('My third Node.js server');
  res.end();
}).listen(8000, function(){
 console.log("server started at 8000");
});
