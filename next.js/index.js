let http = require('http');

http.createServer(function (req, res) {
  res.write('himmmmmmmmmm');
  res.end();
}).listen(3000, function(){
 console.log("server started at 3000");
});
