"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const wishlist_controller_1 = require("../controllers/wishlist.controller");
const router = express_1.default.Router();
router.get('/GetWishListById', wishlist_controller_1.getWishListById);
router.post('/AddToWishList', auth_middleware_1.authenticateToken, wishlist_controller_1.addToWishList);
router.delete('/DeleteItemInWishList', auth_middleware_1.authenticateToken, wishlist_controller_1.deleteItemInWishList);
exports.default = router;
//# sourceMappingURL=wishList.router.js.map