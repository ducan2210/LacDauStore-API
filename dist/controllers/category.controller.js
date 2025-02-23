"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryTree = exports.getAllCategoryRoot = exports.getAllCategoryChildren = exports.getCategory = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query); // Kiểm tra xem req.query có chứa giá trị gì
    try {
        const category = yield category_model_1.default.findAll({ where: { parent_id: null } });
        if (category) {
            res.status(200).json(category);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching product' });
    }
});
exports.getCategory = getCategory;
const getAllCategoryChildren = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query); // Kiểm tra xem req.query có chứa giá trị gì
    try {
        const category = yield category_model_1.default.findAll({
            where: { parent_id: req.query.parent_id },
        });
        if (category) {
            res.status(200).json(category);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching roduct' });
    }
});
exports.getAllCategoryChildren = getAllCategoryChildren;
const getAllCategoryRoot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_model_1.default.findAll({
            where: { parent_id: null },
        });
        if (category) {
            res.status(200).json(category);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching roduct' });
    }
});
exports.getAllCategoryRoot = getAllCategoryRoot;
const getCategoryTree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Lấy tất cả danh mục từ cơ sở dữ liệu
        const categories = yield category_model_1.default.findAll();
        // Tạo một hàm đệ quy để xây dựng cây danh mục
        const buildCategoryTree = (parentId) => {
            return categories
                .filter(category => category.parent_id === parentId)
                .map(category => ({
                category_id: category.category_id,
                name: category.name,
                description: category.description,
                parent_id: category.parent_id,
                created_at: category.created_at,
                updated_at: category.updated_at,
                children: buildCategoryTree(category.category_id), // Đệ quy để lấy các danh mục con
            }));
        };
        // Xây dựng cây danh mục từ gốc (parent_id === null)
        const categoryTree = buildCategoryTree(null);
        // Trả về dữ liệu dạng cây
        res.status(200).json(categoryTree);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching category tree' });
    }
});
exports.getCategoryTree = getCategoryTree;
//# sourceMappingURL=category.controller.js.map