'use strict';

const Server = require('./core/server');

const server = new Server();
server.start(process.env.PORT || 8090);
