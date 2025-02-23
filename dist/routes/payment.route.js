"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("../controllers/payment.controller");
const router = express_1.default.Router();
// Tạo URL thanh toán
router.post('/CreatePaymentUrl', payment_controller_1.createPaymentUrl);
// Xử lý kết quả thanh toán
router.get('/vnpay_return', payment_controller_1.vnpayReturn);
exports.default = router;
//# sourceMappingURL=payment.route.js.map