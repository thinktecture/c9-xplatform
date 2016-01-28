'use strict';

const InMemoryStorage = require('../storages/inMemoryStorage').InMemoryStorage;

/**
 * @public
 * @constructor
 */
function OAuthModel() {
    const storage = new InMemoryStorage();

    const sampleUser = {
        id: 1000,
        clientId: 'sample-client',
        clientSecret: 'sample-client-secret'
    };

    // See here for needed method implementations: https://github.com/thomseddon/node-oauth2-server

    this.getClient = (clientId, clientSecret, callback) => {
        callback(null, {
            clientId: sampleUser.clientId,
            clientSecret: sampleUser.clientSecret
        });
    };

    this.saveAccessToken = (accessToken, clientId, expires, user, callback) => {
        storage.create({
            accessToken: accessToken,
            clientId: clientId,
            expires: expires,
            user: user
        });

        callback();
    };

    this.grantTypeAllowed = (clientId, grantType, callback) => {
        callback(null, grantType === 'password' && clientId === sampleUser.clientId);
    };

    this.getAccessToken = (bearerToken, callback) => {
        const list = storage.findAll();

        let data;

        list.forEach(item => {
            if (data) {
                return;
            }

            if (item.accessToken === bearerToken) {
                data = item;
            }
        });

        if (!data) {
            return callback('Bearer token is invalid.');
        }

        callback(null, {
            accessToken: data.id,
            clientId: data.clientId,
            expires: data.expires,
            userId: data.user
        });
    };

    this.getUser = (username, password, callback) => {
        if (username === password && !!username && password) {
            return callback(null, {
                id: sampleUser.id
            });
        }

        callback(true);
    };
}

module.exports = new OAuthModel();
