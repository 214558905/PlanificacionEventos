"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
const sequelize = new sequelize_1.Sequelize('eventosDB', 'postgres', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
});
exports.default = sequelize;
