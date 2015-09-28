// A seagull-themed lorem ipsum generator served by Node.js
// The vast majority of the server and template engine code
// was built follwing the Node.js tutorial at teamtreehouse.com

var router = require("./js/router.js");

// Create a web server
var http = require('http');
http.createServer(function (request, response) {
  router.ipsum(request, response);
  router.about(request, response);
  router.css(request, response);
  router.js(request, response);
  router.logo(request, response);  
  router.bgImage(request, response);    
}).listen(process.env.PORT || 5000);
console.log('Server running at Port: ' + (process.env.PORT !== undefined ? process.env.PORT : 5000));