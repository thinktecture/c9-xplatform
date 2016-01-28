'use strict';

const availableApis = [
    require('../apis/customer/get'),
    require('../apis/customer/post'),
    require('../apis/customer/put'),
    require('../apis/customer/delete'),
    require('../apis/customer/list')
];

/**
 * @typedef {object} ApiRegistration
 *
 * @property {string} route - The route where to access the API
 * @property {string} [method=GET] - HTTP verb
 */

/**
 * @public
 * @constructor
 */
function ApiRegistry() {
    /**
     * @returns {*}
     */
    this.getRegistrations = () => {
        const registrations = [];

        availableApis.forEach(Api => {
            registrations.push(new Api().getRegistration());
        });

        return registrations;
    };
}

module.exports = ApiRegistry;
