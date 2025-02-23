"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const router = express_1.default.Router();
router.get('/GetCategory', category_controller_1.getCategory);
router.get('/GetCategoryChildren', category_controller_1.getAllCategoryChildren);
router.get('/GetCategoryTree', category_controller_1.getCategoryTree);
router.get('/GetAllCategoryRoot', category_controller_1.getAllCategoryRoot);
exports.default = router;
//# sourceMappingURL=category.route.js.map