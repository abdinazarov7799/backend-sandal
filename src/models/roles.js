const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Roles = sequelize.define('Roles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
});

module.exports = Roles;
