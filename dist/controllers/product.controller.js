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
exports.getProductByCategoryID = exports.searchProduct = exports.getProductById = exports.getAllProductAvailability = exports.getAllProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const sequelize_1 = require("sequelize");
const category_model_1 = __importDefault(require("../models/category.model"));
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query); // Kiểm tra xem req.query có chứa giá trị gì
    try {
        const product = yield product_model_1.default.findAll();
        if (product) {
            res.status(200).json(product);
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
exports.getAllProduct = getAllProduct;
const getAllProductAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.findAll({
            where: {
                stock: {
                    [sequelize_1.Op.gt]: 0 // Chỉ lấy các sản phẩm có stock > 0
                }
            }
        });
        if (products.length > 0) {
            res.status(200).json(products);
        }
        else {
            res.status(404).json({ message: 'No products available' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});
exports.getAllProductAvailability = getAllProductAvailability;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    try {
        const product = yield product_model_1.default.findOne({
            where: {
                product_id: req.query.product_id,
            }
        });
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ message: 'No product available' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching product' });
    }
});
exports.getProductById = getProductById;
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query; // Lấy chuỗi tìm kiếm từ query parameters
    console.log(query);
    // Kiểm tra query có phải là chuỗi hay không
    if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Query is required and must be a string' });
    }
    try {
        // Tìm kiếm các category phù hợp với query
        const categories = yield category_model_1.default.findAll({
            where: {
                category_id: { [sequelize_1.Op.like]: `%${query}%` }, // Tìm kiếm theo loại
            },
        });
        // Lấy danh sách category_id từ các category tìm được
        const categoryIds = categories.map((category) => category.category_id);
        // Tìm kiếm các sản phẩm theo tên hoặc category_id
        const products = yield product_model_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { name: { [sequelize_1.Op.like]: `%${query}%` } }, // Tìm kiếm theo tên
                    { category_id: { [sequelize_1.Op.in]: categoryIds } }, // Tìm kiếm theo category_id
                    { description: { [sequelize_1.Op.like]: `%${query}%` } }, // Tìm kiếm theo mô tả
                ],
            },
        });
        // // Kiểm tra nếu có sản phẩm, trả về kết quả
        // if (products.length > 0) {
        //   res.status(200).json(products);
        // } else {
        //   res.status(404).json(products);
        // }
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching products' });
    }
});
exports.searchProduct = searchProduct;
const getProductByCategoryID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.query.category_id;
        // Hàm đệ quy để lấy tất cả danh mục con
        const getAllChildCategories = (parentId) => __awaiter(void 0, void 0, void 0, function* () {
            const children = yield category_model_1.default.findAll({ where: { parent_id: parentId } });
            let childIds = children.map(child => child.category_id);
            for (let child of children) {
                const grandChildren = yield getAllChildCategories(child.category_id);
                childIds = [...childIds, ...grandChildren];
            }
            return childIds;
        });
        // Lấy tất cả danh mục con và danh mục hiện tại
        const childCategories = yield getAllChildCategories(Number(categoryId));
        const allCategoryIds = [Number(categoryId), ...childCategories];
        // Tìm tất cả sản phẩm thuộc các danh mục này
        const products = yield product_model_1.default.findAll({
            where: {
                category_id: {
                    [sequelize_1.Op.in]: allCategoryIds
                }
            }
        });
        if (products.length > 0) {
            res.status(200).json(products);
        }
        else {
            res.status(404).json({ message: 'No products available in this category or its subcategories' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});
exports.getProductByCategoryID = getProductByCategoryID;
// export const getProductShortByTimeEndingSoonest = async (req: Request, res: Response) => {
//   try {
//     const products = await Product.findAll({
//       order: [
//         ['updated_at', 'DESC'] // Sắp xếp theo thời gian cập nhật giảm dần
//       ]
//     });
//     if (products.length > 0) {
//       res.status(200).json(products);
//     } else {
//       res.status(404).json({ message: 'No products available' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error fetching products' });
//   }
// };
// export const getProductShortByTimeNewlyListed = async (req: Request, res: Response) => {
//   try {
//     const products = await Product.findAll({
//       order: [
//         ['updated_at', 'ASC'] // Sắp xếp theo thời gian cập nhật tăng dần
//       ]
//     });
//     if (products.length > 0) {
//       res.status(200).json(products);
//     } else {
//       res.status(404).json({ message: 'No products available' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error fetching products' });
//   }
// };
// export const getProductShortByPriceLowestFirst = async (req: Request, res: Response) => {
//   try {
//     const products = await Product.findAll({
//       order: [
//         ['price', 'ASC'] // Sắp xếp theo giá tăng dần
//       ]
//     });
//     if (products.length > 0) {
//       res.status(200).json(products);
//     } else {
//       res.status(404).json({ message: 'No products available' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error fetching products' });
//   }
// };
// export const getProductShortByPriceHighestFirst = async (req: Request, res: Response) => {
//   try {
//     const products = await Product.findAll({
//       order: [
//         ['price', 'DESC'] // Sắp xếp theo giá giảm dần
//       ]
//     });
//     if (products.length > 0) {
//       res.status(200).json(products);
//     } else {
//       res.status(404).json({ message: 'No products available' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error fetching products' });
//   }
// };
//# sourceMappingURL=product.controller.js.map