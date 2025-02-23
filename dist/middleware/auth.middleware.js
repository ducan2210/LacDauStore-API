"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
// Middleware xác thực token JWT
const authenticateToken = (req, res, next) => {
    var _a;
    // Lấy token từ header "Authorization"
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Lấy token từ "Bearer <token>"
    if (!token) {
        res.status(401).json({ error: 'No token provided' });
        return; // Kết thúc hàm nếu không có token
    }
    (jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({ error: 'Invalid or expired token' });
            return;
        }
        // Ép kiểu tạm thời để tránh lỗi TypeScript
        req.user = decoded;
        next();
    }));
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=auth.middleware.js.map