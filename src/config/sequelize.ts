import { Sequelize } from 'sequelize-typescript';
import * as Models from '../models';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD
});

sequelize.addModels(Object.values(Models));
