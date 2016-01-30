'use strict';

/**
 * @public
 * @constructor
 */
function InMemoryStorage() {
    let counter = 1;
    const internalStorage = {};

    function validateWhereConditionForId(condition) {
        if (!condition || !condition.where || !condition.where.id) {
            throw new Error('where.id is not defined');
        }
    }

    this.findById = id => {
        return Promise.resolve(internalStorage[id]);
    };

    this.create = (data) => {
        data.id = counter++;
        internalStorage[data.id] = data;
        return Promise.resolve(internalStorage[data.id]);
    };

    this.destroy = condition => {
        validateWhereConditionForId(condition);

        const id = condition.where.id;

        if (internalStorage[id]) {
            delete internalStorage[id];
            return Promise.resolve();
        }

        return Promise.reject();
    };

    this.update = (data, condition) => {
        validateWhereConditionForId(condition);

        data.id = condition.where.id;
        internalStorage[condition.where.id] = data;
        return Promise.resolve(internalStorage[condition.where.id]);
    };

    this.findAll = () => {
        const result = [];

        Object.getOwnPropertyNames(internalStorage).forEach(item => {
            result.push(internalStorage[item]);
        });

        return Promise.resolve(result);
    };
}

/**
 * @public
 * @constructor
 */
function InMemoryStorageWrapper() {
    this.initialize = () => {
        const models = {
            customer: new InMemoryStorage(),
            token: new InMemoryStorage()
        };

        return Promise.resolve(models);
    };
}

module.exports = InMemoryStorageWrapper;

// Just for oauthModel usage, which should normally go into the selected storage as well. But, KISS :)
module.exports.InMemoryStorage = InMemoryStorage;
