//express is used to include express.js framework instance
const express = require('express');
const app = express();

//Morgan is used for logging request details. Helped me in debugging my code.
const morgan = require('morgan');

//body-parser is helpful in extracting the entire body portion of request stream
const bodyParser = require('body-parser');

//mongoose is used here to provide data modeling environment while using MongoDB
const mongoose = require('mongoose');

//redirects requests to '/users' path
const userRoutes = require('./api/routes/users');

mongoose.connect(
    'mongodb+srv://root:'+process.env.MONGO_ATLAS_PW+'@cluster0-xfcmc.mongodb.net/test?retryWrites=true'
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//The following code is commented for future use. This code gains control over the access control.
// It also validates and restricts incoming HTTP Verbs based on the value received in the "OPTIONS" method.

/*app.use((req, res, next) => {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Headers', '*');

     //Used to allow only the following HTTP verbs
     if(req.method === "OPTIONS") {
         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
         return res.status(200).json({});
     }
});*/

//Routes which handle incoming requests
app.use('/users', userRoutes);

//For all invalid incoming requests
app.use((req, res, next) => {
     const error = new Error('Request Not found');
     error.status = 404;
     next(error);
});

//For all error messages or HTTP 500 status
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;