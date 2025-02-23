"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('lacDauStore', 'root', 'ducan2210', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Tắt logging của sequelize
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map