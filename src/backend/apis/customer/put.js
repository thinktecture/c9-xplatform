'use strict';

const customerService = require('../../services/customerService');

/**
 * @public
 * @constructor
 */
function PutCustomer() {
    /**
     * @returns {ApiRegistration}
     */
    this.getRegistration = () => {
        return {
            route: 'customer',
            method: 'put',
            callback: handle
        }
    };

    function handle(req, res) {
        customerService.update(req.body)
            .then(result => {
                result ? res.json(result) : res.send(500);
            });
    }
}

module.exports = PutCustomer;
