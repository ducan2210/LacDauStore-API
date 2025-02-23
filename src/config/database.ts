import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('lacDauStore', 'root', 'ducan2210', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,  // Tắt logging của sequelize
});

export default sequelize;
