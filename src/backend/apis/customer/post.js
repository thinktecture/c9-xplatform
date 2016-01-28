'use strict';

const customerService = require('../../services/customerService');

/**
 * @public
 * @constructor
 */
function PostCustomer() {
    /**
     * @returns {ApiRegistration}
     */
    this.getRegistration = () => {
        return {
            route: 'customer',
            method: 'post',
            callback: handle
        }
    };

    function handle(req, res) {
        customerService.create(req.body)
            .then(result => {
                result ? res.json(result) : res.send(404);
            });
    }
}

module.exports = PostCustomer;
