const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('sandal', 'postgres', 'root123', {
//     host: 'localhost',
//     port: 5432,
//     dialect: 'postgres',
// });

const sequelize = new Sequelize('postgres://sandal:JGX0INLAjYDjqD4N32TOsAdreqXDADaC@dpg-cn1mluol5elc73d9uc30-a/sandal_fm9t');

module.exports = sequelize;
