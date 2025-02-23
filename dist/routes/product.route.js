"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const router = express_1.default.Router();
router.get('/GetAllProduct', product_controller_1.getAllProduct);
router.get('/GetSearchProduct', product_controller_1.searchProduct);
router.get('/GetAllProductAvailability', product_controller_1.getAllProductAvailability);
router.get('/GetProductById', product_controller_1.getProductById);
router.get('/GetProductByCategoryID', product_controller_1.getProductByCategoryID);
// router.get('/GetProductShortByTimeEndingSoonest', getProductShortByTimeEndingSoonest)
// router.get('/GetProductShortByPriceLowestFirst', getProductShortByPriceLowestFirst)
// router.get('/GetProductShortByPriceHighestFirst', getProductShortByPriceHighestFirst)
// router.get('/GetProductShortByTimeEndingSoonest', getProductShortByTimeNewlyListed)
exports.default = router;
//# sourceMappingURL=product.route.js.map