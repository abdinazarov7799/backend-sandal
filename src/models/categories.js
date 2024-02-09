const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
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
    img_url: {
        type: DataTypes.STRING,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = Category;
