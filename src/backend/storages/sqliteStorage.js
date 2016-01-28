'use strict';

const path = require('path');

const Sequelize = require('sequelize');

/**
 * @public
 * @constructor
 */
function SqliteStorage() {
    let sequelize;
    let models = {};

    /**
     * @returns {*}
     */
    this.initialize = () => {
        if (sequelize) {
            return Promise.resolve();
        }

        sequelize = new Sequelize('channel9crm', 'channel9crm', 'channel9crm', {
            host: 'localhost',
            dialect: 'sqlite',
            storage: path.join(__dirname, '../channel9crm.db')
        });

        initializeModels();

        return syncDatabase()
            .then(() => {
                return models;
            });
    };

    function initializeModels() {
        const customerModel = sequelize.import('../dbModels/customer.js');
        models[customerModel.name] = customerModel;
    }

    function syncDatabase() {
        return sequelize.sync();
    }
}

module.exports = SqliteStorage;
