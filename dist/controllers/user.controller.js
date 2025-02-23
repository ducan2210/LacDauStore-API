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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserByUsername = exports.login = exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cart_model_1 = __importDefault(require("../models/cart.model"));
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email, phone, address, role, status } = req.body;
    try {
        // Kiểm tra nếu username hoặc email đã tồn tại
        const existingUser = yield user_model_1.default.findOne({ where: { username } });
        const existingEmail = yield user_model_1.default.findOne({ where: { email } });
        if (existingUser || existingEmail) {
            res.status(400).json({
                error: existingUser ? 'Username already exists' : 'Email already exists',
            });
            return; // Dừng hàm để không tiếp tục thực thi
        }
        // Kiểm tra độ dài password
        if (password.length < 6) {
            res.status(400).json({ error: 'Password must be at least 6 characters long' });
            return;
        }
        // Mã hóa mật khẩu
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Tạo người dùng mới
        const user = yield user_model_1.default.create({
            username,
            password: hashedPassword,
            email,
            phone,
            address,
            role,
            status,
        });
        const cart = yield cart_model_1.default.create({
            user_id: user.user_id, // Sử dụng ID của user vừa tạo
        });
        // Ẩn mật khẩu trước khi trả về
        const _a = user.toJSON(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
        // Tạo token JWT sau khi đăng ký thành công
        const token = jsonwebtoken_1.default.sign({ id: user.user_id, username: user.username }, JWT_SECRET, {
            expiresIn: '7d', // Token hết hạn sau 7 ngày
        });
        res.status(201).json({
            message: 'User registered successfully',
            user: userWithoutPassword,
            token,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Kiểm tra username có tồn tại không
        const user = yield user_model_1.default.findOne({ where: { username } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        // Kiểm tra mật khẩu
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        // Tạo token
        const token = jsonwebtoken_1.default.sign({ id: user.user_id, username: user.username }, JWT_SECRET, {
            expiresIn: '7d',
        });
        // Ẩn mật khẩu trước khi trả về
        const _a = user.toJSON(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
        res.status(200).json({
            message: 'Login successful',
            token,
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error logging in' });
    }
});
exports.login = login;
const getUserByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query); // Kiểm tra xem req.query có chứa giá trị gì
    try {
        const user = yield user_model_1.default.findOne({
            where: { username: req.query.username },
        });
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching user' });
    }
});
exports.getUserByUsername = getUserByUsername;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email, phone, address } = req.body;
    console.log('Query Username:', req.query.username);
    console.log('Request Body:', req.body);
    try {
        const user = yield user_model_1.default.findOne({
            where: { username: req.query.username },
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return; // Thêm `return` để kết thúc hàm
        }
        user.password = password || user.password;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        yield user.save();
        res.status(200).json({
            message: 'User updated successfully',
            user: {
                username: user.username,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating user' });
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=user.controller.js.map