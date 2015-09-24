var renderer = require("./renderer.js");
var fs = require("fs");
var htmlHeader = {'Content-Type': 'text/html'};

// Handle HTTP route for home page
function ipsum(request, response) {
  if(request.url === "/") {
      response.writeHead(200, htmlHeader);
      renderer.view("header", {}, response);
      renderer.view("ipsum", {}, response);
      renderer.view("footer", {}, response); 
      response.end();
  }
}

// Handle HTTP route for about page
function about(request, response) {
  if(request.url === "/about") {
      response.writeHead(200, htmlHeader);
      renderer.view("header", {}, response);
      renderer.view("about", {}, response);
      renderer.view("footer", {}, response);
      response.end();
  }
}

// Handle HTTP route for the logo
function logo(request, response) {
  if(request.url.indexOf('logo.png') != -1) {
     var img = fs.readFileSync('./img/logo.png');
     response.writeHead(200, {'Content-Type': 'image/png' });
     response.end(img, 'binary');
  }
}

// Handle HTTP route for the background image
function bgImage(request, response) {
  if(request.url.indexOf('gull.jpg') != -1){
     var img = fs.readFileSync('./img/gull.jpg');
     response.writeHead(200, {'Content-Type': 'image/jpg' });
     response.end(img, 'binary');
  }
}

// Handle HTTP route for the CSS file
function css(request, response) {
  if(request.url.indexOf('style.css') != -1){
      var css = fs.readFileSync('./css/style.css');
      response.writeHead(200, {'Content-Type': 'text/css'});
      response.write(css);
      response.end();
  }
}

// Handle HTTP route for the JavaScript file
function js(request, response) {
  if(request.url.indexOf('.js') != -1){
      var js = fs.readFileSync('./ipsum.js');
      response.writeHead(200, {'Content-Type': 'text/js'});
      response.write(js);
      response.end();
  }
}

module.exports.ipsum = ipsum;
module.exports.about = about;
module.exports.css = css;
module.exports.js = js;
module.exports.logo = logo;
module.exports.bgImage = bgImage;