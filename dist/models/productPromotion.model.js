"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class ProductPromotion extends sequelize_1.Model {
}
ProductPromotion.init({
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Thiết lập product_id là một phần của khóa chính
    },
    promotion_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Thiết lập promotion_id là một phần của khóa chính
    },
}, {
    sequelize: database_1.default,
    tableName: 'product_promotions',
    timestamps: false,
});
exports.default = ProductPromotion;
//# sourceMappingURL=productPromotion.model.js.map