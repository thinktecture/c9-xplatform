'use strict';

const customerService = require('../../services/customerService');

/**
 * @public
 * @constructor
 */
function ListCustomer() {
    /**
     * @returns {ApiRegistration}
     */
    this.getRegistration = () => {
        return {
            route: 'customers',
            callback: handle
        }
    };

    function handle(req, res) {
        customerService.list()
            .then(result => {
                result ? res.json(result) : res.send(500);
            });
    }
}

module.exports = ListCustomer;
