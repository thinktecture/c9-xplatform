'use strict';

const restify = require('restify'),
    corsMiddleware = require('restify-cors-middleware'),
    oauthServer = require('oauth2-server');

const ApiRegistry = require('./apiRegistry'),
    oauthModel = require('./oauthModel');

/**
 * @public
 * @constructor
 */
function Server() {
    let restifyServer;

    // node-oauth2-server is made for express, not for restify. Since restify does not support a method called "get" on the req object
    // we need to patch it.
    const reqGetPatch = (req, res, next) => {
        req.get = header => {
            return req.header(header);
        };

        next();
    };

    // node-oauth2-server is made for express, not for restify. Since restify does not support a method called "jsonp" on the res object
    // we need to patch it.
    const jsonpPatch = (req, res, next) => {
        res.jsonp = data => {
            res.json(data);
        };

        next();
    };

    const oauthAuthorize = (req, res, next) => {
        var authorize = restifyServer.oauth.authorise();

        authorize(req, res, (err) => {
            // Simply return 401 if an error has happened
            if (err) {
                res.send(401, err);
                return next(err);
            }

            next();
        });
    };

    function createRestifyServer() {
        const server = restify.createServer({
            name: 'c9-xplatform-server'
        });

        var cors = corsMiddleware({
            allowHeaders: ['Authorization']
        });

        server.pre(cors.preflight);
        server.use(cors.actual);
        server.use(restify.queryParser());

        server.oauth = oauthServer({
            model: oauthModel,
            grants: ['password']
        });

        server.post('/oauth/token',
            jsonpPatch,
            restify.urlEncodedBodyParser({ mapParams: false }),
            server.oauth.grant());


        server.use(restify.bodyParser());

        server.on('uncaughtException', (req, res, route, error) => {
            console.error(error);
        });

        return server;
    }

    /**
     * Starts the server
     *
     * @param {number?} port - The port where the server should listen to
     */
    this.start = (port) => {
        port = port || 8090;

        restifyServer = createRestifyServer();

        initializeApis();

        restifyServer.listen(port, () => {
            console.log(`Server is up and running on port ${port}`);
        });
    };

    function initializeApis() {
        const registry = new ApiRegistry();
        const registrations = registry.getRegistrations();

        registrations.forEach(registration => addRoute(`/api/${registration.route}`, registration.method, registration.callback));
    }

    function addRoute(route, method, handler) {
        method = (method || 'get').toLowerCase();
        restifyServer[method](route, reqGetPatch, oauthAuthorize, handler);

        console.log('Registered route', method, route);
    }
}

module.exports = Server;
