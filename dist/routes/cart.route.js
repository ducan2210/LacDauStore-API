"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controllers/cart.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post('/AddToCart', auth_middleware_1.authenticateToken, cart_controller_1.addToCart);
router.get('/GetCartById', cart_controller_1.getCartById);
router.delete('/DeleteItemInCart', auth_middleware_1.authenticateToken, cart_controller_1.deleteItemInCart);
router.put('/UpdateItemInCart', auth_middleware_1.authenticateToken, cart_controller_1.updateItemInCart);
router.get('/GetCalculateCartTotal', cart_controller_1.getCalculateCartTotal);
exports.default = router;
//# sourceMappingURL=cart.route.js.map