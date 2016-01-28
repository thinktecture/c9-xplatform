'use strict';

const customerService = require('../../services/customerService');

/**
 * @public
 * @constructor
 */
function GetCustomer() {
    /**
     * @returns {ApiRegistration}
     */
    this.getRegistration = () => {
        return {
            route: 'customer/:id',
            callback: handle
        }
    };

    function handle(req, res) {
        customerService.get(req.params.id)
            .then(result => {
                result ? res.json(result) : res.send(404);
            });
    }
}

module.exports = GetCustomer;
