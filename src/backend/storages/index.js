'use strict';

const InternalStorage = process.argv[2] === '--in-memory' ? require('./inMemoryStorage') : require('./sqliteStorage');

let models;

module.exports = {
    get: function () {
        if (models) {
            return Promise.resolve(models);
        }

        return new Promise((resolve, reject) => {
            const storage = new InternalStorage();
            storage.initialize()
                .then(m => {
                    models = m;
                    resolve(models);
                }, reject);
        });
    }
};
