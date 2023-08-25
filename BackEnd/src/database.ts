import { Sequelize } from "sequelize";
if(process.env.NODE_ENV != 'production'){ 
    require('dotenv').config();
  }

const sequelize = new Sequelize('eventosDB', 'postgres', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
})

export default sequelize;