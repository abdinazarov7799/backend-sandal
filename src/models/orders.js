const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users');
const Branch = require('./branches');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    items: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue: [],
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
    },
    reject_comment: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    user_firstname: {
        type: DataTypes.STRING,
    },
    user_lastname: {
        type: DataTypes.STRING,
    },
    branch_name: {
        type: DataTypes.STRING,
    }
});

Order.belongsTo(User, { foreignKey: 'user_id' });
Order.belongsTo(Branch, { foreignKey: 'branch_id' });

module.exports = Order;
