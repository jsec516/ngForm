/// <reference path="./typings/tsd.d.ts" />
// Use strict mode to enable ES6 : class, etc ...
'use strict';

// require(__base + 'router/public')
global.__appRoot = __dirname + '/';
// Prepare server environment
//==============================================================================
var app = require("./server/app").app();

// START THE SERVER
// =============================================================================

// set our port in the PORT environment variable
var port = process.env.PORT || 8000;

app.listen(port);
console.log(new Date());
console.log('Waiting for connection on port ' + port);