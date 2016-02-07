'use strict';

module.exports = (sequelize, DataTypes) => {
    /**
     * @name Token
     * @type {Model}
     * @public
     */
    return sequelize.define('token', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accessToken: {
            type: DataTypes.STRING,
            allowNull: false
        },
        clientId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expires: {
            type: DataTypes.DATE,
            allowNull: false
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};
