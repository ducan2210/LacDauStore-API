"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.vnpayReturn = exports.createPaymentUrl = void 0;
const crypto = __importStar(require("crypto"));
const querystring = __importStar(require("querystring"));
const vnpayConfig_1 = require("../config/vnpayConfig");
const payment_model_1 = __importDefault(require("../models/payment.model"));
// ✅ Tạo URL thanh toán & lưu giao dịch vào DB
const createPaymentUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id, amount } = req.body;
        console.log('Request body:', req.body);
        // Kiểm tra và chuyển đổi amount thành số
        const amountNumber = typeof amount === 'string' ? parseFloat(amount) : typeof amount === 'number' ? amount : undefined;
        console.log('Amount number:', amountNumber);
        if (amountNumber === undefined || isNaN(amountNumber)) {
            res.status(400).json({ error: 'Invalid amount' });
            return;
        }
        const ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const createDate = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
        console.log('IP Address:', ipAddr);
        console.log('Create Date:', createDate);
        // 🔹 Lưu vào database với trạng thái "pending"
        const payment = yield payment_model_1.default.create({
            order_id,
            amount: amountNumber,
            status: 'pending', // Mặc định khi tạo giao dịch
        });
        console.log('Payment created:', payment);
        // 🔹 Tạo tham số gửi lên VNPAY
        let vnpParams = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: vnpayConfig_1.vnpayConfig.tmnCode,
            vnp_Amount: amountNumber * 100, // Chuyển sang VND
            vnp_CurrCode: 'VND',
            vnp_TxnRef: payment.payment_id, // Sử dụng payment_id làm mã giao dịch
            vnp_OrderInfo: `Thanh toán đơn hàng ${order_id}`,
            vnp_OrderType: 'other',
            vnp_Locale: 'vn',
            vnp_ReturnUrl: vnpayConfig_1.vnpayConfig.returnUrl,
            vnp_IpAddr: ipAddr,
            vnp_CreateDate: createDate,
        };
        console.log('VNPAY Params:', vnpParams);
        // 🔹 Sắp xếp tham số để tạo chữ ký
        const sortedParams = Object.keys(vnpParams)
            .sort()
            .reduce((acc, key) => {
            acc[key] = vnpParams[key];
            return acc;
        }, {});
        console.log('Sorted Params:', sortedParams);
        // 🔹 Tạo chữ ký bảo mật
        const signData = querystring.stringify(sortedParams, '&', '=');
        const hmac = crypto.createHmac('sha512', vnpayConfig_1.vnpayConfig.secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        console.log('Signed:', signed);
        sortedParams.vnp_SecureHash = signed;
        // 🔹 Trả về URL thanh toán
        const paymentUrl = `${vnpayConfig_1.vnpayConfig.vnpUrl}?${querystring.stringify(sortedParams)}`;
        console.log('Payment URL:', paymentUrl);
        res.json({ paymentUrl });
    }
    catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Lỗi khi tạo thanh toán' });
    }
});
exports.createPaymentUrl = createPaymentUrl;
// ✅ Xử lý kết quả thanh toán & cập nhật DB
const vnpayReturn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vnp_Params = req.query;
        const secureHash = vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHash'];
        // 🔹 Xác thực chữ ký từ VNPAY
        const sortedParams = Object.keys(vnp_Params)
            .sort()
            .reduce((acc, key) => {
            acc[key] = vnp_Params[key];
            return acc;
        }, {});
        const signData = querystring.stringify(sortedParams, '&', '=');
        const hmac = crypto.createHmac('sha512', vnpayConfig_1.vnpayConfig.secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        if (secureHash !== signed) {
            res.status(400).json({ message: '🚫 Chữ ký không hợp lệ!' });
            return;
        }
        // 🔹 Lấy transaction ID từ VNPAY
        const paymentId = Number(vnp_Params['vnp_TxnRef']); // ID giao dịch (payment_id)
        const transactionId = vnp_Params['vnp_TransactionNo']; // ID do VNPAY cấp
        // 🔹 Tìm giao dịch trong database
        const payment = yield payment_model_1.default.findByPk(paymentId);
        if (!payment) {
            res.status(404).json({ message: 'Giao dịch không tồn tại!' });
            return;
        }
        // 🔹 Cập nhật trạng thái thanh toán
        payment.status = vnp_Params['vnp_ResponseCode'] === '00' ? 'completed' : 'failed';
        yield payment.save();
        res.json({
            message: payment.status === 'completed' ? '✅ Thanh toán thành công!' : '❌ Thanh toán thất bại!',
            transaction_id: transactionId,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Lỗi khi xử lý giao dịch' });
    }
});
exports.vnpayReturn = vnpayReturn;
//# sourceMappingURL=payment.controller.js.map