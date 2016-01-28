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
        return internalStorage[id];
    };

    this.create = (data) => {
        data.id = counter++;
        internalStorage[data.id] = data;
        return internalStorage[data.id];
    };

    this.destroy = condition => {
        validateWhereConditionForId(condition);

        const id = condition.where.id;

        if (internalStorage[id]) {
            delete internalStorage[id];
            return true;
        }

        return false;
    };

    this.update = (data, condition) => {
        validateWhereConditionForId(condition);

        data.id = condition.where.id;
        return internalStorage[condition.where.id] = data;
    };

    this.findAll = () => {
        const result = [];

        Object.getOwnPropertyNames(internalStorage).forEach(item => {
            result.push(internalStorage[item]);
        });

        return result;
    };
}

/**
 * @public
 * @constructor
 */
function InMemoryStorageWrapper() {
    this.initialize = () => {
        let models = {
            customer: new InMemoryStorage()
        };

        return Promise.resolve(models);
    };
}

module.exports = InMemoryStorageWrapper;

// Just for oauthModel usage, which should normally go into the selected storage as well. But, KISS :)
module.exports.InMemoryStorage = InMemoryStorage;
