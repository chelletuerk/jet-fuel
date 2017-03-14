const http = require("http");


const server = http.createServer()

server.listen(3000, () => {
  console.log('The HTTP server is listening at Port 3000.');
});

server.on('request', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('Hello World');
  response.end();
});


// app.locals.folders = []
// folder = { id: 1, name: food }
// app.locals.folders.push.(folder)

const port = process.env.PORT || 3000;

server.listen(port);
console.log(`Listening on ${port}`);
