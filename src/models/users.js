const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Roles = require('./roles');
const Branches = require('./branches');

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Roles,
            key: 'id',
        },
    },
    login: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Branches,
            key: 'id',
        },
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

Users.belongsTo(Roles, { foreignKey: 'role_id' });
Users.belongsTo(Branches, { foreignKey: 'branch_id' });

module.exports = Users;
