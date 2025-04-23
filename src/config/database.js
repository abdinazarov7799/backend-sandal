const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('sandal', 'postgres', 'root123', {
//     host: 'localhost',
//     port: 5432,
//     dialect: 'postgres',
// });

const sequelize = new Sequelize('postgres://sandal_6t3j_user:MdSPhPB7jXnXTqq0cCPV2p0X3bKAe5X0@dpg-d04dq1s9c44c739hrh70-a/sandal_6t3j');

module.exports = sequelize;
