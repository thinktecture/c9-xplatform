'use strict';

const customerService = require('../../services/customerService');

/**
 * @public
 * @constructor
 */
function DeleteCustomer() {
    /**
     * @returns {ApiRegistration}
     */
    this.getRegistration = () => {
        return {
            route: 'customer/:id',
            method: 'del',
            callback: handle
        }
    };

    function handle(req, res) {
        customerService.delete(req.params.id)
            .then(result => {
                result ? res.send(200, {deletd:true}) : res.send(404);
            });
    }
}

module.exports = DeleteCustomer;
