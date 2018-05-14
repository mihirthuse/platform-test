//RESTful api sends HTTP verb requests to web service and responds back in HTTP as well. Hence http is required to be included.
const http = require('http');
//an object of the main .js file of this webservice, called app.js
const app = require('./app');

//port checks the port number set by the environment variable of the local machine or 3000, whichever is available.
const port = process.env.PORT || 3000;

//this object creates a server each time we want to run this web service. It takes in the app.js object which makes a subsequent call to the web service.
const server = http.createServer(app);

//server listening on specified port.
server.listen(port);