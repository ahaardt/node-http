const http = require('http');
const fs = require ('fs');
const path = require ('path');


const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log('Request for' + req.url + 'by method' + req.method);


if (req.method == 'GET') {
    var fileUrl;
    if (req.url == '/') fileUrl = '/index.html';
    else fileUrl = req.url;

    var filePath = path.resolve('./public'+fileUrl);
    const fileExt = path.extname(filePath);
    if (fileExt == '.html') {
      //Callback function, if exists is false...
      fs.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end('<html><body><h1>Error 404: ' + fileUrl +
                      ' not found</h1></body></html>');
          //Return back to callback, similar to a loop
          return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        //Reads file and send to response
        fs.createReadStream(filePath).pipe(res);
      });
    }
    //If file extension is not HTML
    else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><h1>Error 404: ' + fileUrl +
              ' not a HTML file</h1></body></html>');
    }
  }

  //If file is not GET
  else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><h1>Error 404: ' + req.method +
              ' not supported</h1></body></html>');
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});