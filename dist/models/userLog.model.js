"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class UserLog extends sequelize_1.Model {
}
UserLog.init({
    log_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    login_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    logout_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    ip_address: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    user_agent: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'user_logs',
    timestamps: false,
});
exports.default = UserLog;
//# sourceMappingURL=userLog.model.js.map