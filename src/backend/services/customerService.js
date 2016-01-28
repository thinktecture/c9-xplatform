'use strict';

const storage = require('../storages');

/**
 * @public
 * @constructor
 */
function CustomerService() {
    // This service utilizes the SequelizeJS Syntax. Otherwise, a service wrapper would be needed, to wrap the commands
    // to the underlying storage.

    this.get = id => {
        return storage.get()
            .then(s => s.customer.findById(id));
    };

    this.create = (data) => {
        return storage.get()
            .then(s => s.customer.create({
                firstName: data.firstName,
                lastName: data.lastName,
                age: data.age
            }));
    };

    this.list = () => {
        return storage.get()
            .then(s => s.customer.findAll());
    };

    this.update = data => {
        return storage.get()
            .then(s => s.customer.update({
                firstName: data.firstName,
                lastName: data.lastName,
                age: data.age
            }, {
                where: {
                    id: data.id
                }
            }));
    };

    this.delete = id => {
        return storage.get()
            .then(s => s.customer.destroy({
                where: {
                    id: id
                }
            }));
    };
}

module.exports = new CustomerService();
