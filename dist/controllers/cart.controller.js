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
exports.getCalculateCartTotal = exports.updateItemInCart = exports.deleteItemInCart = exports.getCartById = exports.addToCart = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, product_id, quantity } = req.body;
    try {
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng của user hay chưa
        const existingCartItem = yield cart_model_1.default.findOne({
            where: { user_id, product_id },
        });
        if (existingCartItem) {
            // Nếu đã tồn tại, cập nhật số lượng
            existingCartItem.quantity += quantity; // Cộng thêm số lượng mới
            yield existingCartItem.save();
            res.status(200).json({
                message: 'Cart updated successfully',
                cart: existingCartItem,
            });
        }
        else {
            // Nếu chưa tồn tại, tạo mới
            const newCartItem = yield cart_model_1.default.create({
                user_id,
                product_id,
                quantity,
            });
            res.status(201).json({
                message: 'Cart created successfully',
                cart: newCartItem,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing cart' });
    }
});
exports.addToCart = addToCart;
const getCartById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.query;
    console.log(user_id); // Check the data sent in the request
    try {
        const result = yield cart_model_1.default.findAll({
            where: { user_id: user_id },
        });
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({ message: 'No cart found for the specified user.' });
        }
    }
    catch (error) {
        console.error('Error while fetching the cart:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the cart. Please try again later.' });
    }
});
exports.getCartById = getCartById;
const deleteItemInCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, product_id } = req.query;
    console.log(user_id, product_id); // Check the data sent in the request
    try {
        const result = yield cart_model_1.default.findOne({
            where: { user_id: user_id, product_id: product_id },
        });
        if (result) {
            yield result.destroy();
            res.status(200).json({ message: 'Item deleted successfully from the cart.' });
        }
        else {
            res.status(404).json({ message: 'No cart found for the specified user.' });
        }
    }
    catch (error) {
        console.error('Error while fetching the cart:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the cart. Please try again later.' });
    }
});
exports.deleteItemInCart = deleteItemInCart;
const updateItemInCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, product_id, quantity } = req.query;
    try {
        const cartItem = yield cart_model_1.default.findOne({
            where: { user_id: user_id, product_id: product_id },
        });
        if (cartItem) {
            // Cập nhật số lượng sản phẩm trong giỏ hàng
            cartItem.quantity = Number(quantity);
            yield cartItem.save();
            res.status(200).json({ message: 'Item updated successfully in the cart.', cart: cartItem });
        }
        else {
            res.status(404).json({ message: 'No cart found for the specified user.' });
        }
    }
    catch (error) {
        console.error('Error while updating the cart:', error);
        res.status(500).json({ error: 'An error occurred while updating the cart. Please try again later.' });
    }
});
exports.updateItemInCart = updateItemInCart;
const getCalculateCartTotal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.query;
    try {
        // Lấy tất cả các sản phẩm trong giỏ hàng của người dùng
        const cartItems = yield cart_model_1.default.findAll({
            where: { user_id: user_id },
            include: [{ model: product_model_1.default, as: 'Product', attributes: ['price', 'discount_price'] }] // Kết hợp với bảng Product để lấy giá và giá khuyến mãi
        });
        if (!cartItems || cartItems.length === 0) {
            res.status(200).json({ total: 0 });
            return;
        }
        // Tính tổng giá tiền
        const total = cartItems.reduce((sum, cartItem) => {
            const product = cartItem.get('Product');
            if (!product) {
                throw new Error(`Product not found for cart item with product_id: ${cartItem.product_id}`);
            }
            const price = product.discount_price !== null ? product.discount_price : product.price;
            return sum + cartItem.quantity * price;
        }, 0);
        // Định dạng tổng giá tiền với 2 chữ số sau dấu phẩy
        const formattedTotal = parseFloat(total.toFixed(2));
        res.status(200).json({ total: formattedTotal });
    }
    catch (error) {
        console.error('Error while calculating cart total:', error);
        res.status(500).json({ error: 'An error occurred while calculating the cart total. Please try again later.' });
    }
});
exports.getCalculateCartTotal = getCalculateCartTotal;
//# sourceMappingURL=cart.controller.js.map