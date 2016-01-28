'use strict';


module.exports = (sequelize, DataTypes) => {
    /**
     * @name Customer
     * @type {Model}
     * @public
     */
    return sequelize.define('customer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
};
