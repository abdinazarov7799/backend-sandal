const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./categories');

const Product = sequelize.define('Product', {
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
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id',
        },
    },
    img_url: {
        type: DataTypes.STRING,
    },
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

Product.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Product;
